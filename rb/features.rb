# Openf1CarData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module Openf1CarDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      Openf1CarDataBaseFeature.new
    when "test"
      Openf1CarDataTestFeature.new
    else
      Openf1CarDataBaseFeature.new
    end
  end
end
