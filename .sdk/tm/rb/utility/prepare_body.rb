# Openf1CarData SDK utility: prepare_body
require_relative 'media'
module Openf1CarDataUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return Openf1CarDataUtilities.raw_body(ctx.reqdata) if Openf1CarDataUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
