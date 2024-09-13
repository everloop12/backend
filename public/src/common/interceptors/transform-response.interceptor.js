"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformResponseInterceptor = void 0;
const operators_1 = require("rxjs/operators");
class TransformResponseInterceptor {
    intercept(ctx, next) {
        const request = ctx.switchToHttp().getRequest();
        if (request.url.includes('/paymob/webhook')) {
            return next.handle();
        }
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (data?.hasOwnProperty('data') || false && data?.hasOwnProperty('meta') || false) {
                const { data: d, meta } = data;
                return {
                    success: true,
                    status: ctx.switchToHttp().getResponse().statusCode,
                    data: d,
                    meta,
                };
            }
            return {
                success: true,
                status: ctx.switchToHttp().getResponse().statusCode,
                data,
                total: Array.isArray(data) ? data.length : undefined,
            };
        }));
    }
}
exports.TransformResponseInterceptor = TransformResponseInterceptor;
//# sourceMappingURL=transform-response.interceptor.js.map