class RemoveAppIdFromCases < ActiveRecord::Migration
  def change
    remove_column :cases, :app_id, :string
  end
end
