module Api
  class IdsController < ApplicationController

    def index
    end

    def show
       # Retrieve the application id being stored at state of initialization of the active case.
       @case = Case.find_by_case_id(params[:case_id])
       @application_id = @case.application_id 
       render json: {:application_id => @application_id }
    end

    def active_status
      #To detect if there is an active status case.
      @user = User.find(params[:id])
      @cases = Case.where(user_id: @user.id )
      @active_case = @cases.find_by_active("true")

      if @active_case
          @active_case_status = @active_case.active
          @active_case_id = @active_case.id
          @status = Status.find_by_case_id(@active_case_id)
          @current_url = @status.current_url ? @status.current_url : root_path # Assign root path if there is no value available as defualt
      else
          @active_case_status = false
      end

      render json: {:active_case_status => @active_case_status, :current_url => @current_url }
    end

    def new
      
    end
    
    def create
      # generate new application case when the user choose the application on the front page
      @case = Case.new(case_params)
      @case.active = true       
      if @case.save 
        @status = Status.create(questionnaire: false, filling: false, payment: false, complete: false, case_id: @case.id)
        render json: {:message => "New case has successfully created!"}
      else
        redirect_to root
        render json: {:message => "New case generation was not successful!"}
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