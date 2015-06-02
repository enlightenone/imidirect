module Api
  class IdsController < ApplicationController

    def index
    end

    def show
       # Retrieve the application id being stored at state of initialization of the active case.
       @case = Case.find_by(case_id: params[:case_id])
       @application_id = @case.application_id 
       render json: {:application_id => @application_id }
    end

    def new
      
    
    def create
      @case = Case.new(case_params)      
      if @case.save 
        @status = Status.create(questionnaire: true, filling: false, payment: false, complete: false, case_id: @case.id)
        render 'create'
      else
        redirect_to root
      end

    end

    def edit
       # This is to specifically to update the application id for I130 form
      @case = Case.find_by(case_id: params[:case_id])
      @case.application_id = params[:id] # update the new application specifically for I130 application
      
      if @case.save
         render json: { :message => "Current case applicaiton id has been updated!"}
      end 
    end

  private
    def case_params
      params.require(:case).permit(:case_id, :application_id, :user_id)
    end
  end
end