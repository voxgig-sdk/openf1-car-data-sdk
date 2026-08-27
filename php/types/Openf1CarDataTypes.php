<?php
declare(strict_types=1);

// Typed models for the Openf1CarData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** CreateCheckoutSession entity data model. */
class CreateCheckoutSession
{
}

/** Request payload for CreateCheckoutSession#create. */
class CreateCheckoutSessionCreateData
{
}

/** EndpointPathPost entity data model. */
class EndpointPathPost
{
    public ?string $id = null;
}

/** Request payload for EndpointPathPost#load. */
class EndpointPathPostLoadMatch
{
    public string $id;
}

/** Request payload for EndpointPathPost#create. */
class EndpointPathPostCreateData
{
    public string $id;
}

/** RaceLap entity data model. */
class RaceLap
{
}

/** Request payload for RaceLap#load. */
class RaceLapLoadMatch
{
}

/** Request payload for RaceLap#create. */
class RaceLapCreateData
{
}

/** SubscriptionCancel entity data model. */
class SubscriptionCancel
{
}

/** Request payload for SubscriptionCancel#load. */
class SubscriptionCancelLoadMatch
{
}

/** SubscriptionSuccess entity data model. */
class SubscriptionSuccess
{
}

/** Request payload for SubscriptionSuccess#load. */
class SubscriptionSuccessLoadMatch
{
}

/** Token entity data model. */
class Token
{
}

/** Request payload for Token#create. */
class TokenCreateData
{
}

/** Webhook entity data model. */
class Webhook
{
}

/** Request payload for Webhook#create. */
class WebhookCreateData
{
}

