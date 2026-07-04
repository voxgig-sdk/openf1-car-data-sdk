# frozen_string_literal: true

# Typed models for the Openf1CarData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# CreateCheckoutSession entity data model.
class CreateCheckoutSession
end

# Match filter for CreateCheckoutSession#create (any subset of CreateCheckoutSession fields).
class CreateCheckoutSessionCreateData
end

# EndpointPathPost entity data model.
class EndpointPathPost
end

# Request payload for EndpointPathPost#load.
#
# @!attribute [rw] id
#   @return [String]
EndpointPathPostLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for EndpointPathPost#create.
#
# @!attribute [rw] id
#   @return [String]
EndpointPathPostCreateData = Struct.new(
  :id,
  keyword_init: true
)

# RaceLap entity data model.
class RaceLap
end

# Match filter for RaceLap#load (any subset of RaceLap fields).
class RaceLapLoadMatch
end

# Match filter for RaceLap#create (any subset of RaceLap fields).
class RaceLapCreateData
end

# SubscriptionCancel entity data model.
class SubscriptionCancel
end

# Match filter for SubscriptionCancel#load (any subset of SubscriptionCancel fields).
class SubscriptionCancelLoadMatch
end

# SubscriptionSuccess entity data model.
class SubscriptionSuccess
end

# Match filter for SubscriptionSuccess#load (any subset of SubscriptionSuccess fields).
class SubscriptionSuccessLoadMatch
end

# Token entity data model.
class Token
end

# Match filter for Token#create (any subset of Token fields).
class TokenCreateData
end

# Webhook entity data model.
class Webhook
end

# Match filter for Webhook#create (any subset of Webhook fields).
class WebhookCreateData
end

