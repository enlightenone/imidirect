require 'securerandom'

class Case < ActiveRecord::Base
  attr_accessor :caseid
  belongs_to :user
  belongs_to :application
  has_one :general_information
  has_one :status
  has_one :i130
  has_one :i131
  has_one :i485
  has_one :i765
  has_many :options

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


