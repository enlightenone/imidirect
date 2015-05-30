class UsersController < ApplicationController

  def new
    #new user registration method
    @user = User.new

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
