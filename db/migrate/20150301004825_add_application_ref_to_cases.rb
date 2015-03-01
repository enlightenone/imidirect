class AddApplicationRefToCases < ActiveRecord::Migration
  def change
    add_reference :cases, :application, index: true
    add_foreign_key :cases, :applications
  end
end
