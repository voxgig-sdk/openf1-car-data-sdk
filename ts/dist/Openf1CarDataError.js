"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Openf1CarDataError = void 0;
class Openf1CarDataError extends Error {
    isOpenf1CarDataError = true;
    sdk = 'Openf1CarData';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.Openf1CarDataError = Openf1CarDataError;
//# sourceMappingURL=Openf1CarDataError.js.map