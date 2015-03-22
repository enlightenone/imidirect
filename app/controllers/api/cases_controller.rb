require 'SecureRandom' #set random 

module Api 
  class CasesController < ApplicationController
    def index
     @result = params[:passedparams]
      render json: @result
    end

    def populate

      @user = User.find(params[:id])
      @user.firstname = "Dave"
      @user.save


      i130test = I130test.new(case_params)
      optiontest = Optiontest.new(option_params)

      if optiontest.save && i130test.save


      else
       redirect_to  "http://facebook.com"
      end

    end

    def option
      @options = params[:options]
      @option = @options['i485-option']
      render json: {answer: @option}
    end

    def create
      @user = User.find(user_params)
      @user.firstname = "Dave"
      @user.save


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