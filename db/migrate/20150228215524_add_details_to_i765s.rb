class AddDetailsToI765s < ActiveRecord::Migration
  def change
    add_column :i765s, :i765_application_type, :string
    add_column :i765s, :i765_previous_application, :string
    add_column :i765s, :i765_office, :string
    add_column :i765s, :i765_date_of_previous_application, :string
    add_column :i765s, :i765_result_of_previous_application, :string
  end
end
