module AppsHelper

# This method is to verify if the user has correct and active case id to access to the case.

def active_case_id
  @active_case = current_user.cases.find_by_active(true)
  @active_case.case_id
end

def active_case_id?
   !active_case_id.nil? || (active_case_id == false)
end

def correct_active_case_id?

end

end
