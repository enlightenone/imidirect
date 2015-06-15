
module Api
  class StatusesController < ApplicationController

    def show

      @case = Case.find_by_case_id(params[:id])
      @case_id = @case.id
      @case_active_status = @case.active ? @case.active : false 
      @status = Status.find_by_case_id(@case_id)

      if @status
        render json: {:status => @status, :case_active_status => @case_active_status } 
      else
        render json: {:status_retrieve_message => "Status retrieve was unsuccessful" }
      end
    end

    def update
      @case_generated_id =params[:id]
      @status = params[:status]

      @current_url = params[:current_url]
      #Update the final pdf and fee transaction stage.
      render json: progress_status_update(@case_generated_id, @status,  @current_url)
    end

  end
end