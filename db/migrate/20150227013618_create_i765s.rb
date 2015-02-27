class CreateI765s < ActiveRecord::Migration
  def change
    create_table :i765s do |t|
      t.string :address
      t.references :case, index: true

      t.timestamps null: false
    end
    add_foreign_key :i765s, :cases
  end
end
