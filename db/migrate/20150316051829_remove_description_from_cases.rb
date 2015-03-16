class RemoveDescriptionFromCases < ActiveRecord::Migration
  def change
    remove_column :cases, :description, :string
  end
end
