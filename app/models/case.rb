require 'securerandom'

class Case < ActiveRecord::Base
  attr_accessor :caseid
  belongs_to :user
  belongs_to :application
  has_one :general_information, dependent: :destroy
  has_one :status, dependent: :destroy
  has_one :i130, dependent: :destroy
  has_one :i131, dependent: :destroy
  has_one :i485, dependent: :destroy
  has_one :i765, dependent: :destroy
  has_many :options, dependent: :destroy

  # Return random case id
  def Case.new_case_id
    SecureRandom.hex(5)
  end

  # Generate case id to new case
  def generate_case_id
    self.caseid = Case.new_case_id
    update_attribute(:case_id, self.caseid)

    return self.caseid 
  end


end


