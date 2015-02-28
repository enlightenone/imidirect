class AddDetailsToI485s < ActiveRecord::Migration
  def change
    add_column :i485s, :i485_application_type, :string
    add_column :i485s, :i485_applicant_current_occupation, :string
    add_column :i485s, :i485_applicant_mother_first_name, :string
    add_column :i485s, :i485_applicant_father_first_name, :string
    add_column :i485s, :i485_applicant_i94_exact_name, :string
  end
end
