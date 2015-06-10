include ChargesHelper
include PdfsHelper

module Api
  class ChargesController < ApplicationController
    def show
      @case_id = params[:id]
      render json: fees_summary_display(@case_id) #pull fees summary of the active case from database
  end

  def create

    #retrieve the current active case
    @current_case = Case.last
    @current_case_id = @current_case.case_id
    @user_id = @current_case.user_id
    
    # Process credit card transaction
    # fees_transaciton(@current_case_id)
    
    if @current_case
        pdf_generator(@user_id, @current_case_id) #generate pdf document
    else
      redirect_to root
    end

  # rescue Stripe::CardError => e
  #   flash[:notice] = e.message
  #   redirect_to root
  end

  end
end