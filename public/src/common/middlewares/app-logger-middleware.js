"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLoggerMiddleware = void 0;
const common_1 = require("@nestjs/common");
let AppLoggerMiddleware = exports.AppLoggerMiddleware = class AppLoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger('HTTP');
    }
    use(request, response, next) {
        const { ip, method, originalUrl, body } = request;
        response.on('close', () => {
            const { statusCode } = response;
            const token = request.headers.authorization?.split(' ')[1] || null;
            const hasToken = token ? true : false;
            this.logger.log(`${method} ${originalUrl} ${statusCode} ${ip} ${hasToken}`);
            if (originalUrl.includes('/stripe/webhook')) {
                return;
            }
            this.logger.log(body);
        });
        next();
    }
};
exports.AppLoggerMiddleware = AppLoggerMiddleware = __decorate([
    (0, common_1.Injectable)()
], AppLoggerMiddleware);
//# sourceMappingURL=app-logger-middleware.js.map