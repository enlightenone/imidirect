class AddDetailsToI130s < ActiveRecord::Migration
  def change
    add_column :i130s, :i130_my_relative, :string
    add_column :i130s, :i130_adoption, :string
    add_column :i130s, :i130_residence_through_adoption, :string
    add_column :i130s, :i130_sponsor_first_name, :string
    add_column :i130s, :i130_sponsor_last_name, :string
    add_column :i130s, :i130_sponsor_middle_name, :string
    add_column :i130s, :i130_sponsor_other_name, :string
    add_column :i130s, :i130_sponsor_street, :string
    add_column :i130s, :i130_sponsor_apt_suit, :string
    add_column :i130s, :i130_sponsor_city, :string
    add_column :i130s, :i130_sponsor_state, :string
    add_column :i130s, :i130_sponsor_country, :string
    add_column :i130s, :i130_sponsor_zip_code, :string
    add_column :i130s, :i130_sponsor_co, :string
    add_column :i130s, :i130_sponsor_phone, :string
    add_column :i130s, :i130_sponsor_dob, :string
    add_column :i130s, :i130_sponsor_pob_town, :string
    add_column :i130s, :i130_sponsor_pob_state, :string
    add_column :i130s, :i130_sponsor_pob_country, :string
    add_column :i130s, :i130_sponsor_nationality, :string
    add_column :i130s, :i130_sponsor_gender_male, :string
    add_column :i130s, :i130_sponsor_gender_female, :string
    add_column :i130s, :i130_sponsor_marital_status_married, :string
    add_column :i130s, :i130_sponsor_marital_status_widowed, :string
    add_column :i130s, :i130_sponsor_marital_status_single, :string
    add_column :i130s, :i130_sponsor_marital_status_divorced, :string
    add_column :i130s, :i130_sponsor_ssn, :string
    add_column :i130s, :i130_sponsor_a_registration_number, :string
    add_column :i130s, :i130_sponsor_date_of_present_marriage, :string
    add_column :i130s, :i130_sponsor_place_of_present_marriage, :string
    add_column :i130s, :i130_sponsor_name_of_prior_spouse, :string
    add_column :i130s, :i130_sponsor_date_of_end_of_prior_marriage, :string
    add_column :i130s, :i130_sponsor_citizenship_birth, :string
    add_column :i130s, :i130_sponsor_citizenship_naturalization, :string
    add_column :i130s, :i130_sponsor_naturalization_number, :string
    add_column :i130s, :i130_sponsor_naturalization_place_of_issuance, :string
    add_column :i130s, :i130_sponsor_pr_date_of_admission, :string
    add_column :i130s, :i130_sponsor_pr_place_of_admission, :string
    add_column :i130s, :i130_sponsor_pr_class_of_admission, :string
    add_column :i130s, :i130_sponsored_intended_residence_adddress, :string
    add_column :i130s, :i130_sponsored_intended_residence_city, :string
    add_column :i130s, :i130_sponsored_intended_residence_state, :string
    add_column :i130s, :i130_sponsored_full_address_abroad, :string
    add_column :i130s, :i130_sponsored_full_address_native_language, :string
    add_column :i130s, :i130_sponsored_name_native_language, :string
  end
end
