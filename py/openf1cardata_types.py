# Typed models for the Openf1CarData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class CreateCheckoutSession:
    pass


@dataclass
class CreateCheckoutSessionCreateData:
    pass


@dataclass
class EndpointPathPost:
    pass


@dataclass
class EndpointPathPostLoadMatch:
    id: str


@dataclass
class EndpointPathPostCreateData:
    id: str


@dataclass
class RaceLap:
    pass


@dataclass
class RaceLapLoadMatch:
    pass


@dataclass
class RaceLapCreateData:
    pass


@dataclass
class SubscriptionCancel:
    pass


@dataclass
class SubscriptionCancelLoadMatch:
    pass


@dataclass
class SubscriptionSuccess:
    pass


@dataclass
class SubscriptionSuccessLoadMatch:
    pass


@dataclass
class Token:
    pass


@dataclass
class TokenCreateData:
    pass


@dataclass
class Webhook:
    pass


@dataclass
class WebhookCreateData:
    pass

