
module Api
  class StatusesController < ApplicationController

    def show
      @case = Case.find_by_case_id(params[:id])
      @case_id = @case.id
      @status = Status.find_by_case_id(@case_id)

      if @status
        render json: @status 
      else
        render json: {:status_retrieve_message => "Status retrieve was unsuccessful" }
      end
    end

    def update
      @case_generated_id =params[:id]
      @status = params[:status]
      @current_url = params[:current_url]
 
      render json: progress_status_update(@case_generated_id, @status,  @current_url)
      # #update progress status
      # @case = Case.find_by_case_id(params[:id])
      # @case_id = @case.id
      # @status = Status.find_by_case_id(@case_id)

      # @status_to_be_updated = params[:status]

      # # Status variables of individual stages
      # @questionnaire_stage = @status.questionnaire
      # @filling_stage = @status.filling
      # @payment_stage = @status.payment
      # @complete_stage = @status.payment




      # if ( @status_to_be_updated == 'questionnaire' )
      #    if (!@questionnaire_stage && !@filling_stage && !@payment_stage && !@complete_stage )
      #         # Update questionnaire status and assign current url path
      #        @status.questionnaire = true
      #        @status.current_url = params[:current_url]         
      #    end 
      # elsif (@status_to_be_updated == 'filling')    
      #    if ( @questionnaire_stage && !@filling_stage && !@payment_stage && !@complete_stage )
      #         # Update filling status and assign current url path
      #        @status.filling = true
      #        @status.current_url = params[:current_url]         
      #    end 
      # elsif (@status_to_be_updated == 'payment') 
      #    if ( @questionnaire_stage && @filling_stage && !@payment_stage && !@complete_stage )
      #         # Update payment status and assign current url path
      #        @status.payment = true
      #        @status.current_url = params[:current_url]         
      #    end 
      # elsif (@status_to_be_updated == 'complete')
      #         # Update complete status and assign current url path
      #     if ( @questionnaire_stage && @filling_stage && @payment_stage && !@complete_stage )
      #        @status.complete = true
      #        @status.current_url = params[:current_url]
      #     end  
      # end #end of if statment


      # if @status.save
      #    render json: {:status_update_message => "Status has been updated successfully" }
      # else
      #    render json: {:status_update_message => "Status upate was unsuccessful" }
      # end

    end

  end
end