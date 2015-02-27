class User < ActiveRecord::Base
  has_many :cases
end
