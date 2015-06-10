module StatusesHelper
# This helper is to update progress status on each stage of the application and store current page's
# url path to be used later when user logs back to continue with on-going case.
def progress_status_update(case_generated_id, status, current_url)
      # Obtain the model generated case id to retrieve status
      @case = Case.find_by_case_id(case_generated_id)
      @case_id = @case.id
      @status = Status.find_by_case_id(@case_id)

      @status_to_be_updated = status

      # Status variables of individual stages
      @questionnaire_stage = @status.questionnaire
      @filling_stage = @status.filling
      @payment_stage = @status.payment
      @complete_stage = @status.payment

      if ( @status_to_be_updated == 'questionnaire' )
         if (!@questionnaire_stage && !@filling_stage && !@payment_stage && !@complete_stage )
              # Update questionnaire status and assign current url path
             @status.questionnaire = true
             @status.current_url = current_url         
         end 
      elsif (@status_to_be_updated == 'filling')    
         if ( @questionnaire_stage && !@filling_stage && !@payment_stage && !@complete_stage )
              # Update filling status and assign current url path
             @status.filling = true
             @status.current_url = current_url        
         end 
      elsif (@status_to_be_updated == 'payment') 
         if ( @questionnaire_stage && @filling_stage && !@payment_stage && !@complete_stage )
              # Update payment status and assign current url path
             @status.payment = true
             @status.current_url = current_url        
         end 
      elsif (@status_to_be_updated == 'complete')
              # Update complete status and assign current url path
          if ( @questionnaire_stage && @filling_stage && @payment_stage && !@complete_stage )
             @status.complete = true
             @status.current_url = current_url
          end  
      end #end of if statment

      if @status.save
         return {:status_update_message => "Status has been updated successfully" }
      else
         return {:status_update_message => "Status upate was unsuccessful" }
      end

end

end
