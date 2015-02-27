class CreateI130s < ActiveRecord::Migration
  def change
    create_table :i130s do |t|
      t.string :address
      t.references :case, index: true

      t.timestamps null: false
    end
    add_foreign_key :i130s, :cases
  end
end
