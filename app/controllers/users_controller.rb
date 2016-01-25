class UsersController < ApplicationController
  before_action :logged_in_user, only: [:edit, :update, :show]
  before_action :correct_user, only: [:edit, :update, :show]

  def index
  end

  def new
    #new user registration method
    @user = User.new
  end

  def show_current_user
    render json: {:current_user => current_user}
  end

  def reroute
     @user_id = params[:user_id]
     @case_id = params[:case_id]
     @app_id = params[:app_id]
     puts "User Id:"
     puts @user_id
     puts "Case Id"
     puts @case_id
     puts "App Id"
     puts @app_id
     puts "Url path"
   

     @form_url = "#{root_url}users/#{@user_id}/apps/1#/main/option?case_id=#{@case_id}&app_id=#{@app_id}"
      redirect_to @form_url
     #{Rails.root}/public/generated_pdfs/#{@case_id}_combined.pdf"

    # firefax_url =  "http://localhost:3000/users/2/apps/1#/main/option?case_id=4sEMEdczvh&app_id=1"
    # redirect_to firefax_url
  end

  def show
    @user = User.find(params[:id])
    @first_name = @user.firstname
    @last_name = @user.lastname

    @cases = @user.cases.last(10).reverse! #change to decending order on list of cases
    @fetched_cases_results = Hash.new
    i = 1

    @cases.each do |c|
      @application_type = c.application.app_id
      @status_questionnaire = c.status.questionnaire
      @status_filling = c.status.filling
      @status_payment = c.status.payment 
      @status_complete = c.status.complete
      @case_active_status = c.active 

      @current_url = c.status.current_url ? c.status.current_url : root_path

      @fetched_cases_results[i.to_s] = { "id" => c.id, "case_id" => c.case_id, "application_type" => @application_type,
           "case_active_status" => @case_active_status,
           "status_questionnaire" => @status_questionnaire, "status_filling" => @status_filling,
           "status_payment" => @status_payment, "status_complete" => @status_complete, 
           "current_url" => @current_url, "case_active" => @case_active_status }
      i += 1
    end

  end

  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = "Welcome to the AmeriDirect Immigration Service"
      redirect_to root_path
    else
      render 'new'
    end
  end

  def edit
    @user = User.find(params[:id])
    @first_name = @user.firstname
    @last_name = @user.lastname
  end

  def update
    @user = User.find(params[:id])
    if @user.update_attributes(user_params)
      flash[:success] = "Profile updated"
      redirect_to root_path
    else
      render 'edit'
    end
  end

  private

    def  user_params
      params.require(:user).permit(:firstname, :lastname, :email, :password, :password_confirmation)
    end

end
