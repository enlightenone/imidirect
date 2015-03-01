require 'SecureRandom'
class FormsController < ApplicationController

  def index
    user = User.create
    @case = user.cases.new()
  end

  def new_case
    user = User.first
    application = Application.first 
    id = SecureRandom.hex
    # params = ActionController::Parameters.new(case_id: id , description: application.description)
    # raise params.inspect
    # @case = user.cases.new(params.require(:case).permit(:case_id, :description, :total))
     @case = user.cases.new(case_id: id, description: application.description)

    

    if @case.save
      redirect_to "http://yahoo.com"
    else
      render :index
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
