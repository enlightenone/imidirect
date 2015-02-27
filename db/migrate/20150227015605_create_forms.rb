class CreateForms < ActiveRecord::Migration
  def change
    create_table :forms do |t|
      t.string :form_id
      t.string :form_name
      t.string :description
      t.float :fee
      t.string :path

      t.timestamps null: false
    end
  end
end
