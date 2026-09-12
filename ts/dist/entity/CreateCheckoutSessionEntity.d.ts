import { Openf1CarDataEntityBase } from '../Openf1CarDataEntityBase';
import type { Openf1CarDataSDK } from '../Openf1CarDataSDK';
import type { Control } from '../types';
import type { CreateCheckoutSession, CreateCheckoutSessionCreateData } from '../Openf1CarDataTypes';
declare class CreateCheckoutSessionEntity extends Openf1CarDataEntityBase<CreateCheckoutSession> {
    constructor(client: Openf1CarDataSDK, entopts: any);
    make(this: CreateCheckoutSessionEntity): CreateCheckoutSessionEntity;
    create(this: any, reqdata?: CreateCheckoutSessionCreateData, ctrl?: Control): Promise<CreateCheckoutSessionEntity>;
}
export { CreateCheckoutSessionEntity };
