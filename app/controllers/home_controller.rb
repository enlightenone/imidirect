class HomeController < ApplicationController
  def index
    @home_page_flag = true # This flag is to trigger main image display.
    # Assign user id when log in or assign default value to prevent rails from breaking
    @current_user_id = (current_user)? current_user.id : "inactive" 
  end

  def about
  end

  def category
    @app_id =  params[:app_id] #application id from params is assigned.
    @home_page_flag = true # This flag is to trigger main image display.
    # Assign user id when log in or assign default value to prevent rails from breaking
    @current_user_id = (current_user)? current_user.id : "inactive" 

  end
end
