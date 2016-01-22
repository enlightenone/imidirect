class HomeController < ApplicationController
  def index
    @home_page_flag = true # This flag is to trigger main image display.
    # Assign user id when log in or assign default value to prevent rails from breaking
    @current_user_id = (current_user)? current_user.id : "inactive" 
  end

  def about
  end

  def category
    @app_id =  params[:app_id]

    if ['9', '10'].include?(@app_id) 
      @title = "Individual Petition"
    elsif @app_id == "1"
      @title = "Family Petitions"
    end 
    #This logic is to determine the tab title on browser based on category of the application

    @home_page_flag = true # This flag is to trigger main image display.
    # Assign user id when log in or assign default value to prevent rails from breaking
    @current_user_id = (current_user)? current_user.id : "inactive" 
  end
end
