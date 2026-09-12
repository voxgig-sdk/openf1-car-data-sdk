import { Context } from './Context';
declare class Openf1CarDataError extends Error {
    isOpenf1CarDataError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { Openf1CarDataError };
