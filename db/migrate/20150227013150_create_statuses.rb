class CreateStatuses < ActiveRecord::Migration
  def change
    create_table :statuses do |t|
      t.boolean :filling
      t.boolean :payment
      t.boolean :complete
      t.references :case, index: true

      t.timestamps null: false
    end
    add_foreign_key :statuses, :cases
  end
end
