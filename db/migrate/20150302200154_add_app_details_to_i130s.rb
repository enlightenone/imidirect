class AddAppDetailsToI130s < ActiveRecord::Migration
  def change
    add_column :i130s, :i130_spouse, :boolean
    add_column :i130s, :i130_parent, :boolean
    add_column :i130s, :i130_BrotherSister, :boolean
    add_column :i130s, :i130_child, :boolean
  end
end
