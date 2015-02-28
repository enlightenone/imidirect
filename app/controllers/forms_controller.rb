class FormsController < ApplicationController

  def new
    @case = Case.new
  end

  def create
    @user = User.create(firstname: "Jason", lastname: "Lee", email: "jason@gmail.com", password_digest: "121212")
    
    if 
  end

  private
    def case_params
      params.require(:case).permit(:case_id, :description, :total)
    end
end
