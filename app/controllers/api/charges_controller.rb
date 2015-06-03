include ChargesHelper
include PdfsHelper

module Api
  class ChargesController < ApplicationController
    def show
      @case_id = params[:id]
      cookies.permanent[:caseid]= @case_id
      render json: fees_summary_display(@case_id) #pull fees information from database
  end

  def create
    # retrieve current case id from cookie
    # @current_case_id = request.cookies["current_case_id"]
    @current_case_id = cookies[:caseid]
    render @current_case_id.inspect
    # @current_case_id = session[:current_case_id]
    
    # take out extra double quote from current case id string
    # @current_case_id = @current_case_id.tr("\"","")
    fees_transaciton(@current_case_id)

    @current_case = Case.find_by_case_id(@current_case_id)
    @user_id = @current_case.user_id

    if @current_case
        pdf_generator(@user_id, @current_case_id)
    else
      redirect_to root
    end

  rescue Stripe::CardError => e
    flash[:notice] = e.message
    redirect_to root
  end

  end
end