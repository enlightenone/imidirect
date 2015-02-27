class CreateFormInformations < ActiveRecord::Migration
  def change
    create_table :form_informations do |t|
      t.string :address
      t.references :case, index: true

      t.timestamps null: false
    end
    add_foreign_key :form_informations, :cases
  end
end
