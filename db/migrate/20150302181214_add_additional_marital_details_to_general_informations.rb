class AddAdditionalMaritalDetailsToGeneralInformations < ActiveRecord::Migration
  def change
    add_column :general_informations, :general_applicant_marital_status_single, :sting
    add_column :general_informations, :general_applicant_marital_status_widowed, :sting
    add_column :general_informations, :general_applicant_marital_status_divorced, :sting
  end
end
