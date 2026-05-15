# Openf1CarData SDK utility: feature_add
module Openf1CarDataUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
