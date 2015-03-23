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
      @case_id = params[:case_id]
      @case = Case.find_by_case_id(@case_id)
      @options = JSON.parse(params[:options])
      
      @options.each do |key, value|
        if key == 'i130-option' && value == true
              @case.options.create(form_id: "i130", form: "I-130", include: true)
        elsif key == 'i485-option' && value == true
              @case.options.create(form_id: "i485", form: "I-485", include: true)
        elsif key == 'i131-option' && value == true
              @case.options.create(form_id: "i131", form: "I-131", include: true)
        elsif key == 'i765-option' && value == true
              @case.options.create(form_id: "i765", form: "I-765", include: true)
        end
      end
      render json:  {log: "Options pupulation successes"}
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