include PdfsHelper
include ChargesHelper

module Api
  class ChargesController < ApplicationController

    def show
      #pull fees information from database
      @case_id = params[:id]
    #   @case = Case.find_by_case_id(@case_id)
    #   @application_fee = @case.application.fee
    #   @app_description = @case.application.description
    #   @options = @case.options
    #   @fees = [{description: "Online Process Fee", fee: @application_fee}]

    #   # loop through options table to determine fee of additional form to be included.
    #   @options.each do |option| 
    #     if option.include == true
    #       if @case.application.forms.find_by_form_id(option.form_id)
    #         @fee =  @case.application.forms.find_by_form_id(option.form_id).fee
    #         @description =  @case.application.forms.find_by_form_id(option.form_id).description
    #         @fees.push({description: @description, fee: @fee})
    #       end
    #     end
    #   end

    #   @total_fee = 0

    #   @fees.each do |f|
    #     @total_fee += f[:fee]
    #   end

    #   #store total fee amount to cases database
    #   @case.update(total: @total_fee)
    #   # @fees_summary = {total_fee: @total_fee, sub_total_fees: @fees}
    #   @fees_summary = {total_fee: @total_fee, sub_total_fees: @fees}
    # ################# End of Fee Pulling Function #######################

    #   render json: @fees_summary.to_json

    render json: fees_summary_display(@case_id)
  end

  def create
    # retrieve current case id from cookie
    @current_case_id = request.cookies["current_case_id"]

    # take out extra double quote from current case id string
    @current_case_id = @current_case_id.tr("\"","")
    
    @case = Case.find_by_case_id(@current_case_id)
    @amount = @case.total
    @amount = (@amount*100).to_i

    customer = Stripe::Customer.create(
      :email => 'schow617@yahoo.com',
      :card  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @amount,
      :description => "Immigration Case",
      :currency    => 'usd'
    )


    @user = User.find(1)
    @user_id =  1
    @current_case = @user.cases.find_by_case_id(@current_case_id)

    if @current_case
       pdf_generator(@user_id, @current_case_id)
    else
      redirect_to "http://facebook.com"
    end

  rescue Stripe::CardError => e
    flash[:notice] = e.message
    redirect_to "http://facebook.com"
  end

  end
end