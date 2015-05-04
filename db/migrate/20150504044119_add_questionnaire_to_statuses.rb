class AddQuestionnaireToStatuses < ActiveRecord::Migration
  def change
    add_column :statuses, :questionnaire, :string
  end
end
