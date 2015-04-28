require 'SecureRandom' #set random 

module Api 
  class CasesController < ApplicationController
    def index
     @result = params[:passedparams]
      render json: @result
    end

    def new

    end

    def create
      @case = Case.new(case_params)      
      if @case.save 
        @status = Status.create(filling: true, payment: false, complete: false, case_id: @case.id)
        render 'create'
      else
        redirect_to root
      end
    end

    def populate
      @user = User.first 
      @current_case = @user.cases.find_by_case_id(params[:id])
      @current_case_id = params[:id]

      @current_case.build_general_information(general_information_params)
      @current_case.build_i130(i130_params)
      @current_case.build_i765(i765_params) if @current_case.options.find_by(form_id: "i765").include

      if @current_case.save
          @current_case_general_information = @current_case.general_information
          @current_case_i765 = @current_case.i765
          @current_case_i130 = @current_case.i130

          # Replace null string value with empty string in general informtion table to enable pdf form generation function
          if @current_case_general_information
            @current_case_general_information.attributes.each do |key, value|
                if @current_case_general_information[key]== "null"
                   @current_case_general_information[key] = ''
                   @current_case_general_information.save
                end
            end
          end

           # Replace null string value with empty string in I765 table to enable pdf form generation function
          if @current_case_i765
             @current_case_i765.attributes.each do |key, value|
                if @current_case_i765[key]== "null"
                   @current_case_i765[key] = ''
                   @current_case_i765.save
                end
            end
          end

           # Replace null string value with empty string in I-130 table to enable pdf form generation function
          if @current_case_i130
            @current_case_i130.attributes.each do |key, value|
                if @current_case_i130[key]== "null"
                   @current_case_i130[key] = ''
                   @current_case_i130.save
                end
            end
          end
        render json: {log: "Form fields population successed!"}
      else
        render json: {log: "Form fields population failed!"}
      end

    end

    def option
      @case_id = params[:case_id]
      @case = Case.find_by_case_id(@case_id)
      @options = JSON.parse(params[:options])
         
      @application_id = @case.application_id #retrieve case id 


      # Determine if the case require i-130 form for the application and assign additional I-130 option if necessary
      if (1..8).include? @application_id 
        @options['i130-option'] = true 
      end

      @options.each do |key, value|
        if key == 'i130-option' && value == true
              @case.options.create(form_id: "i130", form: "I-130", include: true)
        elsif key == 'i485-option' && value == true
              @case.options.create(form_id: "i485", form: "I-485", include: true)
        elsif key == 'i131-option' && value == true
              @case.options.create(form_id: "i131", form: "I-131", include: true)
        elsif key == 'i765-option' && value == true
              @case.options.create(form_id: "i765", form: "I-765", include: true)
        elsif key == 'n400-option' && value == true
              @case.options.create(form_id: "n400", form: "N-400", include: true)
        end
      end

      # In case with I-130 multiple form application,  assign each options with false for each attribute is not defined. 
      # if @options['i130-option'] == true 
        @case.options.create(form_id: "i130", form: "I-130", include: false) unless @case.options.find_by_form_id("i130")
        @case.options.create(form_id: "i485", form: "I-485", include: false) unless @case.options.find_by_form_id("i485")
        @case.options.create(form_id: "i131", form: "I-131", include: false) unless @case.options.find_by_form_id("i131")
        @case.options.create(form_id: "i765", form: "I-765", include: false) unless @case.options.find_by_form_id("i765")
      # end
      render json:  {log: "Options pupulation successes"}
    end

 
private

    def case_parms
        params.require(:case).permit(:case_id, :application_id, :user_id)
    end

    def general_information_params
      params.require(:case).require(:general_information).permit(
                                                    :general_applicant_child_first_name_1,
                                                    :general_applicant_child_last_name_1,
                                                    :general_applicant_child_middle_name_1,
                                                    :general_applicant_child_relationship_1,
                                                    :general_applicant_child_dob_1,
                                                    :general_applicant_child_cob_1,
                                                    :general_applicant_child_a_number_1,
                                                    :general_applicant_child_application_1,
                                                    :general_applicant_child_first_name_2,
                                                    :general_applicant_child_last_name_2,
                                                    :general_applicant_child_middle_name_2,
                                                    :general_applicant_child_relationship_2,
                                                    :general_applicant_child_dob_2,
                                                    :general_applicant_child_cob_2,
                                                    :general_applicant_child_a_number_2,
                                                    :general_applicant_child_application_2,
                                                    :general_applicant_child_first_name_3,
                                                    :general_applicant_child_last_name_3,
                                                    :general_applicant_child_middle_name_3,
                                                    :general_applicant_child_relationship_3,
                                                    :general_applicant_child_dob_3,
                                                    :general_applicant_child_cob_3,
                                                    :general_applicant_child_a_number_3,
                                                    :general_applicant_child_application_3,
                                                    :general_applicant_child_first_name_4,
                                                    :general_applicant_child_last_name_4,
                                                    :general_applicant_child_middle_name_4,
                                                    :general_applicant_child_relationship_4,
                                                    :general_applicant_child_dob_4,
                                                    :general_applicant_child_cob_4,
                                                    :general_applicant_child_a_number_4,
                                                    :general_applicant_child_application_4,
                                                    :general_applicant_child_first_name_5,
                                                    :general_applicant_child_last_name_5,
                                                    :general_applicant_child_middle_name_5,
                                                    :general_applicant_child_relationship_5,
                                                    :general_applicant_child_dob_5,
                                                    :general_applicant_child_cob_5,
                                                    :general_applicant_child_a_number_5,
                                                    :general_applicant_child_application_5,
                                                    :general_applicant_first_name,
                                                    :general_applicant_last_name,
                                                    :general_applicant_middle_name,
                                                    :general_applicant_other_name,
                                                    :general_applicant_street,
                                                    :general_applicant_apt_suit,
                                                    :general_applicant_city,
                                                    :general_applicant_state,
                                                    :general_applicant_country,
                                                    :general_applicant_zip_code,
                                                    :general_applicant_co,
                                                    :general_applicant_phone,
                                                    :general_applicant_dob,
                                                    :general_applicant_pob_town,
                                                    :general_applicant_pob_state,
                                                    :general_applicant_pob_country,
                                                    :general_applicant_nationality,
                                                    :general_applicant_gender_male,
                                                    :general_applicant_gender_female,
                                                    :general_applicant_marital_status_married,
                                                    :general_applicant_ssn,
                                                    :general_applicant_alien_number,
                                                    :general_applicant_i_94,
                                                    :general_applicant_date_of_last_arrival,
                                                    :general_applicant_uscis_status,
                                                    :general_applicant_status_expiration_date,
                                                    :general_applicant_visa_number,
                                                    :general_applicant_last_entry,
                                                    :general_applicant_place_of_last_entry,
                                                    :general_applicant_consulate,
                                                    :general_applicant_entry_inspection,
                                                    :general_applicant_date_present_marriage,
                                                    :general_applicant_place_present_marriage,
                                                    :general_applicant_spouse_first_name,
                                                    :general_applicant_spouse_last_name,
                                                    :general_applicant_spouse_middle_name,
                                                    :general_applicant_spouse_relationship,
                                                    :general_applicant_spouse_dob,
                                                    :general_applicant_spouse_cob,
                                                    :general_applicant_spouse_a_number,
                                                    :general_applicant_spouse_application,
                                                    :general_applicant_marital_status_single,
                                                    :general_applicant_marital_status_widowed,
                                                    :general_applicant_marital_status_divorced
                                                    )
  
    end

    def i130_params
    params.require(:case).require(:i130).permit(
                                                    :i130_adoption,
                                                    :i130_residence_through_adoption,
                                                    :i130_sponsor_first_name,
                                                    :i130_sponsor_last_name,
                                                    :i130_sponsor_middle_name,
                                                    :i130_sponsor_other_name,
                                                    :i130_sponsor_street,
                                                    :i130_sponsor_apt_suit,
                                                    :i130_sponsor_city,
                                                    :i130_sponsor_state,
                                                    :i130_sponsor_country,
                                                    :i130_sponsor_zip_code,
                                                    :i130_sponsor_co,
                                                    :i130_sponsor_phone,
                                                    :i130_sponsor_dob,
                                                    :i130_sponsor_pob_town,
                                                    :i130_sponsor_pob_state,
                                                    :i130_sponsor_pob_country,
                                                    :i130_sponsor_nationality,
                                                    :i130_sponsor_gender_male,
                                                    :i130_sponsor_gender_female,
                                                    :i130_sponsor_marital_status_married,
                                                    :i130_sponsor_marital_status_widowed,
                                                    :i130_sponsor_marital_status_single,
                                                    :i130_sponsor_marital_status_divorced,
                                                    :i130_sponsor_ssn,
                                                    :i130_sponsor_a_registration_number,
                                                    :i130_sponsor_date_of_present_marriage,
                                                    :i130_sponsor_place_of_present_marriage,
                                                    :i130_sponsor_name_of_prior_spouse,
                                                    :i130_sponsor_date_of_end_of_prior_marriage,
                                                    :i130_sponsor_citizenship_birth,
                                                    :i130_sponsor_citizenship_naturalization,
                                                    :i130_sponsor_naturalization_number,
                                                    :i130_sponsor_naturalization_place_of_issuance,
                                                    :i130_sponsor_pr_date_of_admission,
                                                    :i130_sponsor_pr_place_of_admission,
                                                    :i130_sponsor_pr_class_of_admission,
                                                    :i130_sponsored_intended_residence_adddress,
                                                    :i130_sponsored_intended_residence_city,
                                                    :i130_sponsored_intended_residence_state,
                                                    :i130_sponsored_full_address_abroad,
                                                    :i130_sponsored_full_address_native_language,
                                                    :i130_sponsored_name_native_language,
                                                    :i130_spouse,
                                                    :i130_parent,
                                                    :i130_BrotherSister,
                                                    :i130_child
                                                    ) 
    end

    def i765_params
        params.require(:case).require(:i765).permit(
                                                    :i765_previous_application,
                                                    :i765_office,
                                                    :i765_date_of_previous_application,
                                                    :i765_result_of_previous_application,
                                                    :i765_application_employment,
                                                    :i765_application_replacement,
                                                    :i765_application_renewal
                                                  )
    end

    # def case_params
    #   params.require(:i130test).permit(:first_name, :last_name, :pod, :dob, :sponsor_name, :nationality, :country_of_destination, :date_of_return, :counsol, :spouse, :previous_application,  :office)
    # end

    # def option_params
    #   params.require(:optiontest).permit(:name, :age)
    # end

  end
end