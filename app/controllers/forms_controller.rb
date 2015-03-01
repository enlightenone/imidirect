require 'SecureRandom'
class FormsController < ApplicationController

  def index
    user = User.new
    @case = user.cases.new()
  end

  def new_case

    
    user = User.first
    application_description = Application.find_by_app_id(params[:category]).description
    case_id = SecureRandom.hex
    # params = ActionController::Parameters.new(case_id: id , description: application.description)
    # raise params.inspect
    # @case = user.cases.new(params.require(:case).permit(:case_id, :description, :total))
     @case = user.cases.new(case_id: case_id, description: application_description )
     
    # determine the optional applications to file
    if params[:i765_option]
     @case.options.new(form_id: "i765", form: "I-765", include: true)
    else
     @case.options.new(form_id: "i765", form: "I-765", include: false)
    end
      
    if @case.save
      redirect_to forms_path
    else
      redirect_to "http://facebook.com"
    end
  end

  def new
    @case = Case.new

    @test = params[:test]
  end



  def create
    
    
  end

  # private
  #   def case_params(application_option)
  #     id = SecureRandom.hex
  #     params = ActionController::Parameters.new(case_id: id , description: )
  #     params.require(:case).permit(:case_id, :description, :total)
  #   end
end
