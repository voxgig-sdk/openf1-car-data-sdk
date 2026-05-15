-- ProjectName SDK exists test

local sdk = require("openf1-car-data_sdk")

describe("Openf1CarDataSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
