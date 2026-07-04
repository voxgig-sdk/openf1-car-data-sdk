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

/** Match filter for CreateCheckoutSession#create (any subset of CreateCheckoutSession fields). */
class CreateCheckoutSessionCreateData
{
}

/** EndpointPathPost entity data model. */
class EndpointPathPost
{
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

/** Match filter for RaceLap#load (any subset of RaceLap fields). */
class RaceLapLoadMatch
{
}

/** Match filter for RaceLap#create (any subset of RaceLap fields). */
class RaceLapCreateData
{
}

/** SubscriptionCancel entity data model. */
class SubscriptionCancel
{
}

/** Match filter for SubscriptionCancel#load (any subset of SubscriptionCancel fields). */
class SubscriptionCancelLoadMatch
{
}

/** SubscriptionSuccess entity data model. */
class SubscriptionSuccess
{
}

/** Match filter for SubscriptionSuccess#load (any subset of SubscriptionSuccess fields). */
class SubscriptionSuccessLoadMatch
{
}

/** Token entity data model. */
class Token
{
}

/** Match filter for Token#create (any subset of Token fields). */
class TokenCreateData
{
}

/** Webhook entity data model. */
class Webhook
{
}

/** Match filter for Webhook#create (any subset of Webhook fields). */
class WebhookCreateData
{
}

