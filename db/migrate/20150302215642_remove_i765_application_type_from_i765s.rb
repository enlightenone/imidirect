class RemoveI765ApplicationTypeFromI765s < ActiveRecord::Migration
  def change
    remove_column :i765s, :i765_application_type, :string
  end
end
