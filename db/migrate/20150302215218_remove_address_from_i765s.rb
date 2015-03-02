class RemoveAddressFromI765s < ActiveRecord::Migration
  def change
    remove_column :i765s, :address, :string
  end
end
