class AddMoreAdditionalDetailsToGeneralInformations < ActiveRecord::Migration
  def change
    add_column :general_informations, :general_applicant_street, :string
    add_column :general_informations, :general_applicant_apt_suit, :string
    add_column :general_informations, :general_applicant_city, :string
    add_column :general_informations, :general_applicant_state, :string
    add_column :general_informations, :general_applicant_country, :string
    add_column :general_informations, :general_applicant_zip_code, :string
    add_column :general_informations, :general_applicant_co, :string
    add_column :general_informations, :general_applicant_phone, :string
    add_column :general_informations, :general_applicant_dob, :string
    add_column :general_informations, :general_applicant_pob_town, :string
    add_column :general_informations, :general_applicant_pob_state, :string
    add_column :general_informations, :general_applicant_pob_country, :string
    add_column :general_informations, :general_applicant_nationality, :string
    add_column :general_informations, :general_applicant_gender_male, :string
    add_column :general_informations, :general_applicant_gender_female, :string
    add_column :general_informations, :general_applicant_marital_status_married, :string
    add_column :general_informations, :general_applicant_ssn, :string
    add_column :general_informations, :general_applicant_alien_number, :string
    add_column :general_informations, :general_applicant_i_94, :string
    add_column :general_informations, :general_applicant_date_of_last_arrival, :string
    add_column :general_informations, :general_applicant_uscis_status, :string
    add_column :general_informations, :general_applicant_status_expiration_date, :string
    add_column :general_informations, :general_applicant_visa_number, :string
    add_column :general_informations, :general_applicant_last_entry, :string
    add_column :general_informations, :general_applicant_place_of_last_entry, :string
    add_column :general_informations, :general_applicant_consulate, :string
    add_column :general_informations, :general_applicant_entry_inspection, :string
    add_column :general_informations, :general_applicant_date_present_marriage, :string
    add_column :general_informations, :general_applicant_place_present_marriage, :string
    add_column :general_informations, :general_applicant_spouse_first_name, :string
    add_column :general_informations, :general_applicant_spouse_last_name, :string
    add_column :general_informations, :general_applicant_spouse_middle_name, :string
    add_column :general_informations, :general_applicant_spouse_relationship, :string
    add_column :general_informations, :general_applicant_spouse_dob, :string
    add_column :general_informations, :general_applicant_spouse_cob, :string
    add_column :general_informations, :general_applicant_spouse_a_number, :string
    add_column :general_informations, :general_applicant_spouse_application, :string
  end
end
