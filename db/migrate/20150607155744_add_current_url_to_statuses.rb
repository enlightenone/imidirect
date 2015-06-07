class AddCurrentUrlToStatuses < ActiveRecord::Migration
  def change
    add_column :statuses, :current_url, :string
  end
end
