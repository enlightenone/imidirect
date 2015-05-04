class ChangeDataTypeForQuestionnaire < ActiveRecord::Migration
  def self.up
    change_table :statuses do |t|
      t.change :questionnaire, 'boolean USING CAST(questionnaire AS boolean)'
    end
  end
  def self.down
    change_table :statuses do |t|
      t.change :quetionnaire, :string
    end
  end
end
