class CreateOptions < ActiveRecord::Migration
  def change
    create_table :options do |t|
      t.string :form_id
      t.string :form
      t.boolean :include
      t.references :case, index: true

      t.timestamps null: false
    end
    add_foreign_key :options, :cases
  end
end
