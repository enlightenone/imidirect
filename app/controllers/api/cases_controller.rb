require 'securerandom' #set random 
include ParamsHelper # parameters helper
include CasesHelper
include SessionsHelper
include PdfsHelper


module Api 
  class CasesController < ApplicationController
    def index
     @result = params[:passedparams]
      render json: @result
    end

    def new

    end

    def populate
      @current_case_id = params[:id]
      @current_case = Case.find_by_case_id(@current_case_id)
      @user_id = @current_case.user_id
      populate_database(@current_case_id, @user_id)
    end

    def option
      @case_id = params[:case_id]
      @options = JSON.parse(params[:options])
      options_settings(@case_id, @options)
    end

    def destroy
      # This function will remove an active case along with related records from other tables upon
      # the request from the user
      @case_id = params[:case_id]
      @current_user = current_user
      @active_case = Case.find(@case_id);
      @encrypted_case_id = @active_case.case_id

      @delete_result = @active_case.destroy
      if @delete_result
        remove_pdf_file(@encrypted_case_id)
        flash[:success] = "Case has successfully been deleted"
      else
        flash[:danger] = "Case has successfully been deleted"
      end 
       redirect_to user_path(@current_user)
    end
 
private
    # strong parameters to populate 
    def general_information_params
      g_params("general")
    end

    def i130_params
      g_params("i130")
    end

    def i765_params
       g_params("i765")
    end

    def i485_params
       g_params("i485")                                    
    end

  end
end