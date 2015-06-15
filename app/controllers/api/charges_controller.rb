include ChargesHelper
include PdfsHelper

module Api
  class ChargesController < ApplicationController
    def show
      @case_id = params[:id]
      render json: fees_summary_display(@case_id) #pull fees summary of the active case from database
  end

  def create
    @current_case_id = params[:case_id]
    #retrieve the current active case
    @current_case = Case.find_by_case_id(@current_case_id)
    @current_case_id = @current_case.case_id
    @user_id = @current_case.user_id
    
    # Process credit card transaction
    fees_transaciton(@current_case_id)
    
    if @current_case
      pdf_generator(@user_id, @current_case_id) #generate pdf document
      redirect_to '/users/' + @user_id.to_s + '/apps/1#/main/complete?case_id=' + @current_case_id + '&user_id=' +  @user_id.to_s  
    else
      redirect_to root
    end

  # rescue Stripe::CardError => e
  #   flash[:notice] = e.message
  #   redirect_to root
  end

  end
end