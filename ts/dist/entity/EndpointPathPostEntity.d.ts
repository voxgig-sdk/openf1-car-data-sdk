import { Openf1CarDataEntityBase } from '../Openf1CarDataEntityBase';
import type { Openf1CarDataSDK } from '../Openf1CarDataSDK';
import type { Control } from '../types';
import type { EndpointPathPost, EndpointPathPostLoadMatch, EndpointPathPostCreateData } from '../Openf1CarDataTypes';
declare class EndpointPathPostEntity extends Openf1CarDataEntityBase<EndpointPathPost> {
    constructor(client: Openf1CarDataSDK, entopts: any);
    make(this: EndpointPathPostEntity): EndpointPathPostEntity;
    load(this: any, reqmatch?: EndpointPathPostLoadMatch, ctrl?: Control): Promise<EndpointPathPostEntity>;
    create(this: any, reqdata?: EndpointPathPostCreateData, ctrl?: Control): Promise<EndpointPathPostEntity>;
}
export { EndpointPathPostEntity };
