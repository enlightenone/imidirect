class RemoveAddressFromGeneralInformation < ActiveRecord::Migration
  def change
    remove_column :general_informations, :address, :string
  end
end
