module Api
  class CasesController < ApplicationController
    def index
    end

    def new
      
    end

    def create
      i130test = I130test.new(case_params)

      if i130test.save
        render json: i130test
        # redirect_to  "http://yahoo.com"
      else
       redirect_to  "http://facebook.com"
      end

    end
 
  private

    def case_params
      params.require(:i130test).permit(:first_name, :last_name, :pod, :dob, :sponsor_name, :nationality, :country_of_destination, :date_of_return, :counsol, :spouse, :previous_application,  :office)
    end

  end
end