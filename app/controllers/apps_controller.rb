class AppsController < ApplicationController
  # before_action :logged_in_user
  # before_action :correct_user

  def index
      @current_url = request.url
  end

  def show
  end

  def home
  end
end
# 