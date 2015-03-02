class RemoveI130MyRelativeFromI130s < ActiveRecord::Migration
  def change
    remove_column :i130s, :i130_my_relative, :string
  end
end
