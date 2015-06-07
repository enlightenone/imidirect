class CreateCases < ActiveRecord::Migration
  def change
    create_table :cases do |t|
      t.string :case_id
      t.string :description
      t.float :total
      t.references :user, index: true

      t.timestamps null: false
    end
    add_foreign_key :cases, :users
    add_index :cases, [:user_id, :created_at]
  end
end
