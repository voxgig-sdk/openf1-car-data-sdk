import { CreateCheckoutSessionEntity } from './entity/CreateCheckoutSessionEntity';
import { EndpointPathPostEntity } from './entity/EndpointPathPostEntity';
import { RaceLapEntity } from './entity/RaceLapEntity';
import { SubscriptionCancelEntity } from './entity/SubscriptionCancelEntity';
import { SubscriptionSuccessEntity } from './entity/SubscriptionSuccessEntity';
import { TokenEntity } from './entity/TokenEntity';
import { WebhookEntity } from './entity/WebhookEntity';
export type * from './Openf1CarDataTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { Openf1CarDataEntityBase } from './Openf1CarDataEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class Openf1CarDataSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    CreateCheckoutSession(entopts?: Record<string, any>): CreateCheckoutSessionEntity;
    EndpointPathPost(entopts?: Record<string, any>): EndpointPathPostEntity;
    RaceLap(entopts?: Record<string, any>): RaceLapEntity;
    SubscriptionCancel(entopts?: Record<string, any>): SubscriptionCancelEntity;
    SubscriptionSuccess(entopts?: Record<string, any>): SubscriptionSuccessEntity;
    Token(entopts?: Record<string, any>): TokenEntity;
    Webhook(entopts?: Record<string, any>): WebhookEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): Openf1CarDataSDK;
    tester(testopts?: any, sdkopts?: any): Openf1CarDataSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof Openf1CarDataSDK;
export { stdutil, config, BaseFeature, Openf1CarDataEntityBase, Openf1CarDataSDK, SDK, };
