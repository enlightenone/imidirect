class Form < ActiveRecord::Base
  has_many :applications, through: :app_forms
  has_many :documents
end
