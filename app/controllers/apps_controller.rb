class AppsController < ApplicationController
  before_action :logged_in_user, only: [:show]
  before_action :correct_user_application_version, only:[:show]
  before_action :active_case_id?, only: [:show]


  def index
  end

  def show
    case active_app_id
    when 1
      @case_title = "The Family Immigration Petition"
    when 9
      @case_title = "The Work Permit"
    when 10
      @case_title = "The Adjustment Of Status"
    else 
      @case_title = "The Family Immigration Petition"
    end 

  end

  def home
  end

end