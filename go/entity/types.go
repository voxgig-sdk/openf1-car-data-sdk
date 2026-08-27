// Typed models for the Openf1CarData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/openf1-car-data-sdk/go/core"
)

// CreateCheckoutSession is the typed data model for the create_checkout_session entity.
type CreateCheckoutSession struct {
}

// CreateCheckoutSessionCreateData is the typed request payload for CreateCheckoutSession.CreateTyped.
type CreateCheckoutSessionCreateData struct {
}

// EndpointPathPost is the typed data model for the endpoint_path_post entity.
type EndpointPathPost struct {
	Id *string `json:"id,omitempty"`
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

// RaceLapLoadMatch is the typed request payload for RaceLap.LoadTyped.
type RaceLapLoadMatch struct {
}

// RaceLapCreateData is the typed request payload for RaceLap.CreateTyped.
type RaceLapCreateData struct {
}

// SubscriptionCancel is the typed data model for the subscription_cancel entity.
type SubscriptionCancel struct {
}

// SubscriptionCancelLoadMatch is the typed request payload for SubscriptionCancel.LoadTyped.
type SubscriptionCancelLoadMatch struct {
}

// SubscriptionSuccess is the typed data model for the subscription_success entity.
type SubscriptionSuccess struct {
}

// SubscriptionSuccessLoadMatch is the typed request payload for SubscriptionSuccess.LoadTyped.
type SubscriptionSuccessLoadMatch struct {
}

// Token is the typed data model for the token entity.
type Token struct {
}

// TokenCreateData is the typed request payload for Token.CreateTyped.
type TokenCreateData struct {
}

// Webhook is the typed data model for the webhook entity.
type Webhook struct {
}

// WebhookCreateData is the typed request payload for Webhook.CreateTyped.
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
