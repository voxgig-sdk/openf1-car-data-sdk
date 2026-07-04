// Typed models for the Openf1CarData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// CreateCheckoutSession is the typed data model for the create_checkout_session entity.
type CreateCheckoutSession struct {
}

// CreateCheckoutSessionCreateData mirrors the create_checkout_session fields as an all-optional match
// filter (Go analog of Partial<CreateCheckoutSession>).
type CreateCheckoutSessionCreateData struct {
}

// EndpointPathPost is the typed data model for the endpoint_path_post entity.
type EndpointPathPost struct {
}

// EndpointPathPostLoadMatch is the typed request payload for EndpointPathPost.LoadTyped.
type EndpointPathPostLoadMatch struct {
	Id string `json:"id"`
}

// EndpointPathPostCreateData is the typed request payload for EndpointPathPost.CreateTyped.
type EndpointPathPostCreateData struct {
	Id string `json:"id"`
}

// RaceLap is the typed data model for the race_lap entity.
type RaceLap struct {
}

// RaceLapLoadMatch mirrors the race_lap fields as an all-optional match
// filter (Go analog of Partial<RaceLap>).
type RaceLapLoadMatch struct {
}

// RaceLapCreateData mirrors the race_lap fields as an all-optional match
// filter (Go analog of Partial<RaceLap>).
type RaceLapCreateData struct {
}

// SubscriptionCancel is the typed data model for the subscription_cancel entity.
type SubscriptionCancel struct {
}

// SubscriptionCancelLoadMatch mirrors the subscription_cancel fields as an all-optional match
// filter (Go analog of Partial<SubscriptionCancel>).
type SubscriptionCancelLoadMatch struct {
}

// SubscriptionSuccess is the typed data model for the subscription_success entity.
type SubscriptionSuccess struct {
}

// SubscriptionSuccessLoadMatch mirrors the subscription_success fields as an all-optional match
// filter (Go analog of Partial<SubscriptionSuccess>).
type SubscriptionSuccessLoadMatch struct {
}

// Token is the typed data model for the token entity.
type Token struct {
}

// TokenCreateData mirrors the token fields as an all-optional match
// filter (Go analog of Partial<Token>).
type TokenCreateData struct {
}

// Webhook is the typed data model for the webhook entity.
type Webhook struct {
}

// WebhookCreateData mirrors the webhook fields as an all-optional match
// filter (Go analog of Partial<Webhook>).
type WebhookCreateData struct {
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
