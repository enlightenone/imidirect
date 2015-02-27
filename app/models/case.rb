class Case < ActiveRecord::Base
  belongs_to :user
  has_one  :general_information
  has_one :form_information
  has_one :status
  has_one :i130
  has_one :i131
  has_one :i485
  has_one :i765
  has_one :application
  has_many :options
end
