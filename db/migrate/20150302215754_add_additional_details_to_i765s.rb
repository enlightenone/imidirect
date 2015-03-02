class AddAdditionalDetailsToI765s < ActiveRecord::Migration
  def change
    add_column :i765s, :i765_application_employment, :boolean
    add_column :i765s, :i765_application_replacement, :boolean
    add_column :i765s, :i765_application_renewal, :boolean
  end
end
