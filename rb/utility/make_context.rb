# Openf1CarData SDK utility: make_context
require_relative '../core/context'
module Openf1CarDataUtilities
  MakeContext = ->(ctxmap, basectx) {
    Openf1CarDataContext.new(ctxmap, basectx)
  }
end
