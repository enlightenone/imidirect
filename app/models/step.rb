class Step < ActiveRecord::Base
  attr_accessor :current_step

  def current_step
    @current_step || steps.first
  end

  def steps
    %w[category option]
  end

  def next_steop
    self.current_step = steps[steps.index(current_step)+1]
  end


end
