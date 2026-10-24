# frozen_string_literal: true

# Typed models for the Openf1CarData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# CreateCheckoutSession entity data model.
class CreateCheckoutSession
end

# Request payload for CreateCheckoutSession#create.
class CreateCheckoutSessionCreateData
end

# EndpointPathPost entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
EndpointPathPost = Struct.new(
  :id,
  keyword_init: true
)

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

# Request payload for RaceLap#load.
class RaceLapLoadMatch
end

# Request payload for RaceLap#create.
class RaceLapCreateData
end

# SubscriptionCancel entity data model.
class SubscriptionCancel
end

# Request payload for SubscriptionCancel#load.
class SubscriptionCancelLoadMatch
end

# SubscriptionSuccess entity data model.
class SubscriptionSuccess
end

# Request payload for SubscriptionSuccess#load.
class SubscriptionSuccessLoadMatch
end

# Token entity data model.
#
# @!attribute [rw] client_id
#   @return [String, nil]
#
# @!attribute [rw] client_secret
#   @return [Object, nil]
#
# @!attribute [rw] grant_type
#   @return [Object, nil]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] scope
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String]
Token = Struct.new(
  :client_id,
  :client_secret,
  :grant_type,
  :password,
  :scope,
  :username,
  keyword_init: true
)

# Request payload for Token#create.
#
# @!attribute [rw] client_id
#   @return [String, nil]
#
# @!attribute [rw] client_secret
#   @return [Object, nil]
#
# @!attribute [rw] grant_type
#   @return [Object, nil]
#
# @!attribute [rw] password
#   @return [String]
#
# @!attribute [rw] scope
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String]
TokenCreateData = Struct.new(
  :client_id,
  :client_secret,
  :grant_type,
  :password,
  :scope,
  :username,
  keyword_init: true
)

# Webhook entity data model.
class Webhook
end

# Request payload for Webhook#create.
class WebhookCreateData
end

