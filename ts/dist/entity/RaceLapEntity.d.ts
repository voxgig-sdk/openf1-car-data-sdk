import { Openf1CarDataEntityBase } from '../Openf1CarDataEntityBase';
import type { Openf1CarDataSDK } from '../Openf1CarDataSDK';
import type { Control } from '../types';
import type { RaceLap, RaceLapLoadMatch, RaceLapCreateData } from '../Openf1CarDataTypes';
declare class RaceLapEntity extends Openf1CarDataEntityBase<RaceLap> {
    constructor(client: Openf1CarDataSDK, entopts: any);
    make(this: RaceLapEntity): RaceLapEntity;
    load(this: any, reqmatch?: RaceLapLoadMatch, ctrl?: Control): Promise<RaceLapEntity>;
    create(this: any, reqdata?: RaceLapCreateData, ctrl?: Control): Promise<RaceLapEntity>;
}
export { RaceLapEntity };
