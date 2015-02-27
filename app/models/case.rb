class Case < ActiveRecord::Base
  belongs_to :user
  has_one  :general_information
  has_one :form_information
end
