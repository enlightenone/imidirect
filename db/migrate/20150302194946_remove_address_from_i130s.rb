class RemoveAddressFromI130s < ActiveRecord::Migration
  def change
    remove_column :i130s, :address, :string
  end
end
