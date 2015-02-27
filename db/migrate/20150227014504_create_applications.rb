class CreateApplications < ActiveRecord::Migration
  def change
    create_table :applications do |t|
      t.string :app_id
      t.string :description
      t.float :fee

      t.timestamps null: false
    end
  end
end
