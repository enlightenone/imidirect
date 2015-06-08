class HomeController < ApplicationController
  def index
    @home_page_flag = true # This flag is to trigger main image display.
    @current_user_id = (current_user)? current_user.id : "inactive"
  end
end
