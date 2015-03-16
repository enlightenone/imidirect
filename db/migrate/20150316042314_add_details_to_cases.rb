class AddDetailsToCases < ActiveRecord::Migration
  def change
    add_column :cases, :app_id, :string
  end
end
