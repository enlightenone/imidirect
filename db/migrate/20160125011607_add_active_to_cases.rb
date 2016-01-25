class AddActiveToCases < ActiveRecord::Migration
  def change
    add_column :cases, :active, :boolean, default: false
  end
end
