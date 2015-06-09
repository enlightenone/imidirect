class AddUrlStatusToStatuses < ActiveRecord::Migration
  def change
    add_column :statuses, :url_status, :string
  end
end
