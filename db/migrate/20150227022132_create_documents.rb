class CreateDocuments < ActiveRecord::Migration
  def change
    create_table :documents do |t|
      t.string :description
      t.references :form, index: true
      t.references :application, index: true

      t.timestamps null: false
    end
    add_foreign_key :documents, :forms
    add_foreign_key :documents, :applications
  end
end
