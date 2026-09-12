import { Openf1CarDataEntityBase } from '../Openf1CarDataEntityBase';
import type { Openf1CarDataSDK } from '../Openf1CarDataSDK';
import type { Control } from '../types';
import type { Token, TokenCreateData } from '../Openf1CarDataTypes';
declare class TokenEntity extends Openf1CarDataEntityBase<Token> {
    constructor(client: Openf1CarDataSDK, entopts: any);
    make(this: TokenEntity): TokenEntity;
    create(this: any, reqdata?: TokenCreateData, ctrl?: Control): Promise<TokenEntity>;
}
export { TokenEntity };
