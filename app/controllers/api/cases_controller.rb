require 'SecureRandom' #set random 

module Api 
  class CasesController < ApplicationController
    def index
      cases = I130test.all 
      render json: cases.to_json
    end

    def create


      i130test = I130test.new(case_params)
      optiontest = Optiontest.new(option_params)

      if optiontest.save && i130test.save


      else
       redirect_to  "http://facebook.com"
      end

    end
 
  private

    def case_params
      params.require(:i130test).permit(:first_name, :last_name, :pod, :dob, :sponsor_name, :nationality, :country_of_destination, :date_of_return, :counsol, :spouse, :previous_application,  :office)
    end

    def option_params
      params.require(:optiontest).permit(:name, :age)
    end

  end
end