class HomeController < ApplicationController
  def index
    @home_page_flag = true # This flag is to trigger main image display.
    # Assign user id when log in or assign default value to prevent rails from breaking
    @current_user_id = (current_user)? current_user.id : "inactive" 
  end

  def about
  end

  def catgory
    # Assign user id when log in or assign default value to prevent rails from breaking
    @current_user_id = (current_user)? current_user.id : "inactive" 
  end
end
