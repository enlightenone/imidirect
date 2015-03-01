class User < ActiveRecord::Base
  has_many :cases
  has_many :applications, through: :cases
end
