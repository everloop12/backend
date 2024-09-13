"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymobController = void 0;
const common_1 = require("@nestjs/common");
const paymob_service_1 = require("./paymob.service");
const firebase_auth_guard_1 = require("../auth/guards/firebase-auth.guard");
const get_user_decorator_1 = require("../common/decorator/get-user.decorator");
let PaymobController = exports.PaymobController = class PaymobController {
    constructor(paymobService) {
        this.paymobService = paymobService;
    }
    async getAuthToken() {
        return this.paymobService.getAuthToken();
    }
    async createInvoice(userEmail) {
        return this.paymobService.createInvoice(userEmail);
    }
    async webhook(body, hmac) {
        return this.paymobService.webhook(body, hmac);
    }
};
__decorate([
    (0, common_1.Get)('auth-token'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PaymobController.prototype, "getAuthToken", null);
__decorate([
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Post)('invoice'),
    __param(0, (0, get_user_decorator_1.GetUser)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymobController.prototype, "createInvoice", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)('hmac')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymobController.prototype, "webhook", null);
exports.PaymobController = PaymobController = __decorate([
    (0, common_1.Controller)('paymob'),
    __metadata("design:paramtypes", [paymob_service_1.PaymobService])
], PaymobController);
//# sourceMappingURL=paymob.controller.js.map