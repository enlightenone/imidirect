class AddAdditionalMaritalDetailsToGeneralInformations < ActiveRecord::Migration
  def change
    add_column :general_informations, :general_applicant_marital_status_single, :string
    add_column :general_informations, :general_applicant_marital_status_widowed, :string
    add_column :general_informations, :general_applicant_marital_status_divorced, :string
  end
end
