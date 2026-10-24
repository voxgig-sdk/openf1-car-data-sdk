# Typed models for the Openf1CarData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class CreateCheckoutSession(TypedDict):
    pass


class CreateCheckoutSessionCreateData(TypedDict):
    pass


class EndpointPathPost(TypedDict, total=False):
    id: str


class EndpointPathPostLoadMatch(TypedDict):
    id: str


class EndpointPathPostCreateData(TypedDict):
    id: str


class RaceLap(TypedDict):
    pass


class RaceLapLoadMatch(TypedDict):
    pass


class RaceLapCreateData(TypedDict):
    pass


class SubscriptionCancel(TypedDict):
    pass


class SubscriptionCancelLoadMatch(TypedDict):
    pass


class SubscriptionSuccess(TypedDict):
    pass


class SubscriptionSuccessLoadMatch(TypedDict):
    pass


class TokenRequired(TypedDict):
    password: str
    username: str


class Token(TokenRequired, total=False):
    client_id: str
    client_secret: Any
    grant_type: Any
    scope: str


class TokenCreateDataRequired(TypedDict):
    password: str
    username: str


class TokenCreateData(TokenCreateDataRequired, total=False):
    client_id: str
    client_secret: Any
    grant_type: Any
    scope: str


class Webhook(TypedDict):
    pass


class WebhookCreateData(TypedDict):
    pass
