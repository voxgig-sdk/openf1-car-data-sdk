# Openf1CarData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module Openf1CarDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      Openf1CarDataBaseFeature.new
    when "ratelimit"
      Openf1CarDataRatelimitFeature.new
    when "retry"
      Openf1CarDataRetryFeature.new
    when "test"
      Openf1CarDataTestFeature.new
    when "timeout"
      Openf1CarDataTimeoutFeature.new
    else
      Openf1CarDataBaseFeature.new
    end
  end
end
