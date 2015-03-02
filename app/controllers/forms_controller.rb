require 'SecureRandom'
class FormsController < ApplicationController

  def index

  end

  def new
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
      redirect_to new_application_form_path(user_id: user.id, case_id: case_id)
    else
      redirect_to "http://facebook.com"
    end
  end

  def new_application_form
       user = User.find(params[:user_id])
       @form_case = user.cases.find_by_case_id(params[:case_id])
       @general_info = @form_case.build_general_information
       @i130_info = @form_case.build_i130
       @i765_info = @form_case.build_i765
       @i765_option = @form_case.options.find_by(form_id: "i765").include

  end


  def create 
  
  end

end
