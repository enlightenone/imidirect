class AddMoreDetailsToI485s < ActiveRecord::Migration
  def change
    add_column :i485s, :i485_applicant_visa_number_availability, :string
    add_column :i485s, :i485_applicant_visa_derivative_status, :string
    add_column :i485s, :i485_applicant_previous_application, :string
    add_column :i485s, :i485_previous_filing_deposition, :string
  end
end
