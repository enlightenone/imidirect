module Api
  class IdsController < ApplicationController

    def index
    end

    def show
    end

    def new

    end
    
    def create
      user = User.first
      case_id = params(:case_id)
      application_id = Application.find_by_app_id(params[:category]).id

      @case = user.cases.new(case_id: case_id, application_id: application_id)

      if @case.save
        render api_id_path
      else
        redirect_to "http://yahoo.com"
      end

    end

  private
    def case_params
      params.require(:case).permit(:case_id, :application_id)
    end
  end
end