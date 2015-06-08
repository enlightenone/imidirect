class UsersController < ApplicationController
  # before_action :logged_in_user, only: [:edit, :update]
  # before_action :correct_user, only: [:edit, :update]

  def index
  end

  def new
    #new user registration method
    @user = User.new
  end

  def show_current_user
    render json: {:current_user => current_user}
  end

  def show
    @user = User.find(params[:id])
    @first_name = @user.firstname
    @last_name = @user.lastname

    @cases = @user.cases.first(10)
    @fetched_statuses = Hash.new
    i = 1

  
    @cases.each do |c|
      @status_questionnaire = c.status.questionnaire
      @status_filling = c.status.filling
      @status_payment = c.status.payment 

      @fetched_statuses[i.to_s] = { "case_id" => c.case_id, 
           "status_questionnaire" => c.status.questionnaire, "status_filling" => c.status.filling,
           "status_payment" => c.status.payment, "status_complete" => c.status.complete}
      i += 1
      end

    render json: @fetched_statuses

  end

  def create
    @user = User.new(user_params)
    if @user.save
      flash[:success] = "Welcome to the AmeriDirect Immigration Service"
      redirect_to root_path
    else
      render 'new'
    end
  end

  def edit
    @user = User.find(params[:id])
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
