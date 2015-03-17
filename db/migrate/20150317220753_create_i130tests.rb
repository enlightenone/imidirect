class CreateI130tests < ActiveRecord::Migration
  def change
    create_table :i130tests do |t|
      t.string :first_name
      t.string :last_name
      t.string :pod
      t.string :dob
      t.string :sponsor_name
      t.string :nationality
      t.string :country_of_destination
      t.string :date_of_return
      t.string :counsol
      t.string :spouse
      t.string :previous_application
      t.string :office

      t.timestamps null: false
    end
  end
end
