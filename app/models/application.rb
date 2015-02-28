class Application < ActiveRecord::Base
  has_many :cases
  has_many :forms, through: :app_forms
  has_many :app_forms
  has_many :documents
end
