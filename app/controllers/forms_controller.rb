require 'SecureRandom'
require 'fillable_pdf_form'

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

     #set up required form on options table
     @case.options.new(form_id: "i130", form: "I-130", include: true)
     
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
       @i765_option = @form_case.options.find_by(form_id: "i765").include
       @current_case_id = @form_case.case_id
       @current_user_id = params[:user_id]

  end

  def create 
      @user = User.find(params[:current_user_id])
      @current_case = @user.cases.find_by_case_id(params[:current_case_id])
      @current_case_id = params[:current_case_id]
      @current_case.build_general_information(general_information_params)
      @current_case.build_i130(i130_params)
      @current_case.build_i765(i765_params)

    if @current_case.save

        #generate pdf files

        #create new directory and output path
        @new_directory = "#{Rails.root}/tmp/pdfs/#{@current_case_id}"
        Dir.mkdir(@new_directory) unless File.exists?(@new_directory)

        current_options = @current_case.options

         ####block to generate pdf form###
         def pdftk
            @pdftk ||= PdfForms.new(ENV['PDFTK_PATH'] || '/usr/local/bin/pdftk') # On my Mac, the location of pdftk was different than on my linux server.
         end
         ###### end of block ############

        def generate(new_directory, form, attributes, case_id)

            template_path =  "#{Rails.root}/lib/pdf_templates/#{form}.pdf" 
            output_path = "#{@new_directory}/#{case_id}_#{form}.pdf" # make sure tmp/pdfs exists
            pdftk.fill_form template_path, output_path, attributes
            output_path
        end

        #instantiate combined pdf object
        combined_pdf_file = CombinePDF.new

        current_options.each do |option|
            form_included = option.include
            form_id = option.form_id # => 4
            
            if form_included
              #merge general information table with individual form table information
              general_information = @current_case.general_information
              specific_case_attributes =  @current_case.send(form_id)

              general_information = general_information.serializable_hash 
              specific_case_attributes = specific_case_attributes.serializable_hash 
              attributes = general_information.merge(specific_case_attributes)


            ####block to generate pdf form###
            prefilled_pdf_file = generate(@new_directory, form_id, attributes, @current_case_id )
            ###### end of block ############
        
            #add prefiled 
            combined_pdf_file << CombinePDF.new(prefilled_pdf_file) 

            ######## end of block ############
            end
        end

        # combined pdf file path
        combined_pdf_path = "#{Rails.root}/tmp/pdfs/#{@current_case_id}/#{@current_case_id}_combined.pdf"

        # generate combined pdf file
        combined_pdf_file.save combined_pdf_path

    # End of PDF block

        redirect_to pdfs_path
    else
      redirect_to "http://facebook.com"
    end
  end

private  
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

end
