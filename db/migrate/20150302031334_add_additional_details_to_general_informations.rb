class AddAdditionalDetailsToGeneralInformations < ActiveRecord::Migration
  def change
    add_column :general_informations, :general_applicant_first_name, :string
    add_column :general_informations, :general_applicant_last_name, :string
    add_column :general_informations, :general_applicant_middle_name, :string
    add_column :general_informations, :general_applicant_other_name, :string
  end
end
