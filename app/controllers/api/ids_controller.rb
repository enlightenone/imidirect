module Api
  class IdsController < ApplicationController

    def index
    end

    def show
    end

    def new

    end
    
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
      @case.application_id = params[:new_app_id]
      
      if @case.save
         render json: {message: "Current case applicaiton id has been updated!"}
      end 
    end

  private
    def case_params
      params.require(:case).permit(:case_id, :application_id, :user_id)
    end
  end
end