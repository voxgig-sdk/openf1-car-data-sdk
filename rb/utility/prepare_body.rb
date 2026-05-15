# Openf1CarData SDK utility: prepare_body
module Openf1CarDataUtilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
