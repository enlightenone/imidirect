class CreateI131s < ActiveRecord::Migration
  def change
    create_table :i131s do |t|
      t.string :address
      t.references :case, index: true

      t.timestamps null: false
    end
    add_foreign_key :i131s, :cases
  end
end
