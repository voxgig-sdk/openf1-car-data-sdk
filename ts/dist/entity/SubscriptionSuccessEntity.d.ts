import { Openf1CarDataEntityBase } from '../Openf1CarDataEntityBase';
import type { Openf1CarDataSDK } from '../Openf1CarDataSDK';
import type { Control } from '../types';
import type { SubscriptionSuccess, SubscriptionSuccessLoadMatch } from '../Openf1CarDataTypes';
declare class SubscriptionSuccessEntity extends Openf1CarDataEntityBase<SubscriptionSuccess> {
    constructor(client: Openf1CarDataSDK, entopts: any);
    make(this: SubscriptionSuccessEntity): SubscriptionSuccessEntity;
    load(this: any, reqmatch?: SubscriptionSuccessLoadMatch, ctrl?: Control): Promise<SubscriptionSuccessEntity>;
}
export { SubscriptionSuccessEntity };
