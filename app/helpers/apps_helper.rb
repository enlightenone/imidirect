module AppsHelper

# This method is to verify if the user has correct and active case id to access to the case.

  def active_app_id 
    @active_case = current_user.cases.find_by_active(true)
    @active_case.application_id unless @active_case.nil?
  end 

  def active_case_id
    @active_case = current_user.cases.find_by_active(true)
    @active_case.case_id unless @active_case.nil?
  end
  
  def active_case_id?
     redirect_to '/' if active_case_id.nil?
  end


end
