export interface CreateCheckoutSession {
}
export interface CreateCheckoutSessionCreateData {
}
export interface EndpointPathPost {
    id?: string;
}
export interface EndpointPathPostLoadMatch {
    id: string;
}
export interface EndpointPathPostCreateData {
    id: string;
}
export interface RaceLap {
}
export interface RaceLapLoadMatch {
}
export interface RaceLapCreateData {
}
export interface SubscriptionCancel {
}
export interface SubscriptionCancelLoadMatch {
}
export interface SubscriptionSuccess {
}
export interface SubscriptionSuccessLoadMatch {
}
export interface Token {
    client_id?: string;
    client_secret?: any;
    grant_type?: any;
    password: string;
    scope?: string;
    username: string;
}
export interface TokenCreateData {
    client_id?: string;
    client_secret?: any;
    grant_type?: any;
    password: string;
    scope?: string;
    username: string;
}
export interface Webhook {
}
export interface WebhookCreateData {
}
