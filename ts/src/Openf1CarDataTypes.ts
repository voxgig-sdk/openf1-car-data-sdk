// Typed models for the Openf1CarData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface CreateCheckoutSession {
}

export type CreateCheckoutSessionCreateData = Partial<CreateCheckoutSession>

export interface EndpointPathPost {
}

export interface EndpointPathPostLoadMatch {
  id: string
}

export interface EndpointPathPostCreateData {
  id: string
}

export interface RaceLap {
}

export type RaceLapLoadMatch = Partial<RaceLap>

export type RaceLapCreateData = Partial<RaceLap>

export interface SubscriptionCancel {
}

export type SubscriptionCancelLoadMatch = Partial<SubscriptionCancel>

export interface SubscriptionSuccess {
}

export type SubscriptionSuccessLoadMatch = Partial<SubscriptionSuccess>

export interface Token {
}

export type TokenCreateData = Partial<Token>

export interface Webhook {
}

export type WebhookCreateData = Partial<Webhook>

