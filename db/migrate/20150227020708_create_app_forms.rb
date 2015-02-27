class CreateAppForms < ActiveRecord::Migration
  def change
    create_table :app_forms do |t|
      t.references :form, index: true
      t.references :application, index: true

      t.timestamps null: false
    end
    add_foreign_key :app_forms, :forms
    add_foreign_key :app_forms, :applications
  end
end
