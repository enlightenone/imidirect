class HomeController < ApplicationController
  def index
     @user_id = User.first
  end
end
