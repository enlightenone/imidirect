class AppForm < ActiveRecord::Base
  belongs_to :form
  belongs_to :application
end
