class AppsController < ApplicationController
  # before_action :logged_in_user
  # before_action :correct_user

  def index
    @current_url = request.original_url
    @current_full_path = request.fullpath
  end

  def home
  end
end
# 