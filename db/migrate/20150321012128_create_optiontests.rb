class CreateOptiontests < ActiveRecord::Migration
  def change
    create_table :optiontests do |t|
      t.string :name
      t.string :age

      t.timestamps null: false
    end
  end
end
