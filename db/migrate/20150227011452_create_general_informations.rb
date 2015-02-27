class CreateGeneralInformations < ActiveRecord::Migration
  def change
    create_table :general_informations do |t|
      t.string :address
      t.references :case, index: true

      t.timestamps null: false
    end
    add_foreign_key :general_informations, :cases
  end
end
