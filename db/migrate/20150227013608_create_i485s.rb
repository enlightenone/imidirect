class CreateI485s < ActiveRecord::Migration
  def change
    create_table :i485s do |t|
      t.string :address
      t.references :case, index: true

      t.timestamps null: false
    end
    add_foreign_key :i485s, :cases
  end
end
