package voxgigopenf1cardatasdk

import (
	"github.com/voxgig-sdk/openf1-car-data-sdk/go/core"
	"github.com/voxgig-sdk/openf1-car-data-sdk/go/entity"
	"github.com/voxgig-sdk/openf1-car-data-sdk/go/feature"
	_ "github.com/voxgig-sdk/openf1-car-data-sdk/go/utility"
)

// Type aliases preserve external API.
type Openf1CarDataSDK = core.Openf1CarDataSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type Openf1CarDataEntity = core.Openf1CarDataEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type Openf1CarDataError = core.Openf1CarDataError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCreateCheckoutSessionEntityFunc = func(client *core.Openf1CarDataSDK, entopts map[string]any) core.Openf1CarDataEntity {
		return entity.NewCreateCheckoutSessionEntity(client, entopts)
	}
	core.NewEndpointPathPostEntityFunc = func(client *core.Openf1CarDataSDK, entopts map[string]any) core.Openf1CarDataEntity {
		return entity.NewEndpointPathPostEntity(client, entopts)
	}
	core.NewRaceLapEntityFunc = func(client *core.Openf1CarDataSDK, entopts map[string]any) core.Openf1CarDataEntity {
		return entity.NewRaceLapEntity(client, entopts)
	}
	core.NewSubscriptionCancelEntityFunc = func(client *core.Openf1CarDataSDK, entopts map[string]any) core.Openf1CarDataEntity {
		return entity.NewSubscriptionCancelEntity(client, entopts)
	}
	core.NewSubscriptionSuccessEntityFunc = func(client *core.Openf1CarDataSDK, entopts map[string]any) core.Openf1CarDataEntity {
		return entity.NewSubscriptionSuccessEntity(client, entopts)
	}
	core.NewTokenEntityFunc = func(client *core.Openf1CarDataSDK, entopts map[string]any) core.Openf1CarDataEntity {
		return entity.NewTokenEntity(client, entopts)
	}
	core.NewWebhookEntityFunc = func(client *core.Openf1CarDataSDK, entopts map[string]any) core.Openf1CarDataEntity {
		return entity.NewWebhookEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewOpenf1CarDataSDK = core.NewOpenf1CarDataSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
