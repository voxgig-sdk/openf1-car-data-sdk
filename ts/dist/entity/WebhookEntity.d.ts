import { Openf1CarDataEntityBase } from '../Openf1CarDataEntityBase';
import type { Openf1CarDataSDK } from '../Openf1CarDataSDK';
import type { Control } from '../types';
import type { Webhook, WebhookCreateData } from '../Openf1CarDataTypes';
declare class WebhookEntity extends Openf1CarDataEntityBase<Webhook> {
    constructor(client: Openf1CarDataSDK, entopts: any);
    make(this: WebhookEntity): WebhookEntity;
    create(this: any, reqdata?: WebhookCreateData, ctrl?: Control): Promise<WebhookEntity>;
}
export { WebhookEntity };
