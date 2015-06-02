class AppsController < ApplicationController
  # before_action :logged_in_user
  # before_action :correct_user

  def index
  end

  def show
   @case = Case.new(user_id: params[:user_id], application_id: params[:id] ) 
   @case.generate_case_id

   if @case.save 
    @status = Status.create(questionnaire: true, filling: false, payment: false, complete: false, case_id: @case.id)
    # render 'create'
   else
    redirect_to root
   end
  end

  def home
  end

end
# 