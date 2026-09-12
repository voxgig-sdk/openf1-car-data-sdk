import { Openf1CarDataEntityBase } from '../Openf1CarDataEntityBase';
import type { Openf1CarDataSDK } from '../Openf1CarDataSDK';
import type { Control } from '../types';
import type { SubscriptionCancel, SubscriptionCancelLoadMatch } from '../Openf1CarDataTypes';
declare class SubscriptionCancelEntity extends Openf1CarDataEntityBase<SubscriptionCancel> {
    constructor(client: Openf1CarDataSDK, entopts: any);
    make(this: SubscriptionCancelEntity): SubscriptionCancelEntity;
    load(this: any, reqmatch?: SubscriptionCancelLoadMatch, ctrl?: Control): Promise<SubscriptionCancelEntity>;
}
export { SubscriptionCancelEntity };
