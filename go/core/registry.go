package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCreateCheckoutSessionEntityFunc func(client *Openf1CarDataSDK, entopts map[string]any) Openf1CarDataEntity

var NewEndpointPathPostEntityFunc func(client *Openf1CarDataSDK, entopts map[string]any) Openf1CarDataEntity

var NewRaceLapEntityFunc func(client *Openf1CarDataSDK, entopts map[string]any) Openf1CarDataEntity

var NewSubscriptionCancelEntityFunc func(client *Openf1CarDataSDK, entopts map[string]any) Openf1CarDataEntity

var NewSubscriptionSuccessEntityFunc func(client *Openf1CarDataSDK, entopts map[string]any) Openf1CarDataEntity

var NewTokenEntityFunc func(client *Openf1CarDataSDK, entopts map[string]any) Openf1CarDataEntity

var NewWebhookEntityFunc func(client *Openf1CarDataSDK, entopts map[string]any) Openf1CarDataEntity

