module Api
  class StatusesController < ApplicationController

    def show
      
    end

    def update
      #update progress status
      @case = Case.find_by_case_id(params[:id])
      @case_id = @case.id
      @status = Status.find_by_case_id(@case_id)
      @status[params[:status]] = true

      if @status.save
         render json: {:status_update_message => "Status has been updated successfully" }
      else
         render json: {:status_update_message => "Status upate was unsuccessful" }
      end

    end

  end
end