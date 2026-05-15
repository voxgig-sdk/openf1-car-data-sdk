# Openf1CarData SDK exists test

require "minitest/autorun"
require_relative "../Openf1CarData_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = Openf1CarDataSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
