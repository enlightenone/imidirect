require 'SecureRandom' #set random 

module Api 
  class CasesController < ApplicationController
    def index
      cases = I130test.all 
      render json: cases.to_json
    end

    def create

      i130test = I130test.new(case_params)

      if i130test.save
        # render json: i130tes
        render forms_path 
      else
       redirect_to  "http://facebook.com"
      end

    end

    def update
        user = User.first
        application_id = Application.find_by_app_id(params[:category]).id
        case_id = SecureRandom.hex
        @case = user.cases.new(case_id: case_id, application_id: application_id )
    end
 
  private

    def case_params
      params.require(:i130test).permit(:first_name, :last_name, :pod, :dob, :sponsor_name, :nationality, :country_of_destination, :date_of_return, :counsol, :spouse, :previous_application,  :office)
    end

  end
end