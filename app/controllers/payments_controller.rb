class PaymentsController < ApplicationController
  
  def index
  end

  def new
      
      @user = User.first
      @case =  @user.cases.find(2)
      @application_fee = @case.application.fee
      @app_description = @case.application.description
      @i130_description = @case.application.forms.find_by_form_id('i130').description
      @i130_fee =  @case.application.forms.find_by_form_id('i130').fee
      @i1765_description =  @case.application.forms.find_by_form_id('i765').description
      @i765_fee = @case.application.forms.find_by_form_id('i765').fee

      @options = @case.options

      @fees = [{description: "Online Process Fee", fee: @application_fee},
              {description: @i130_description, fee: @i130_fee}]

      # loop through options table to determine fee of additional form to be included.

      @options.each do |option| 
        if option.include == true
          @fee =  @case.application.forms.find_by_form_id(option.form_id).fee
          @description =  @case.application.forms.find_by_form_id(option.form_id).description
          @fees.push({description: @description, fee: @fee})
        end
      end

      @total_fee = 0

      @fees.each do |f|
        @total_fee += f[:fee]
      end



  end

  def create


    @current_case_id = params[:form_id]
    @amount = 155000

    customer = Stripe::Customer.create(
      :email => 'schow617@yahoo.com',
      :card  => params[:stripeToken]
    )

    charge = Stripe::Charge.create(
      :customer    => customer.id,
      :amount      => @amount,
      :description => "Test",
      :currency    => 'usd'
    )

      # combined pdf file path
        @combined_pdf_path = "#{Rails.root}/tmp/pdfs/#{@current_case_id}/#{@current_case_id}_combined.pdf"


        # render combined pdf file to browser
        send_file @combined_pdf_path, type: 'application/pdf', disposition: 'inline'
        # redirect_to "http://yahoo.com"

  rescue Stripe::CardError => e
    flash[:notice] = e.message
    redirect_to "http://facebook.com"
  end

end
