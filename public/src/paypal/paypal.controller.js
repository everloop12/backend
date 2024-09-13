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
exports.PaypalController = void 0;
const common_1 = require("@nestjs/common");
const paypal_service_1 = require("./paypal.service");
const get_user_decorator_1 = require("../common/decorator/get-user.decorator");
const firebase_auth_guard_1 = require("../auth/guards/firebase-auth.guard");
let PaypalController = exports.PaypalController = class PaypalController {
    constructor(paypalService) {
        this.paypalService = paypalService;
    }
    async createOrder(referredById) {
        return this.paypalService.createOrder(referredById);
    }
    async captureOrder(id) {
        return this.paypalService.capturePayment(id);
    }
    async approveOrder(id, email) {
        return this.paypalService.approveOrder(id, email);
    }
};
__decorate([
    (0, common_1.Post)('orders'),
    __param(0, (0, get_user_decorator_1.GetUser)('referredById')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaypalController.prototype, "createOrder", null);
__decorate([
    (0, common_1.Post)('orders/:id/capture'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaypalController.prototype, "captureOrder", null);
__decorate([
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    (0, common_1.Get)('orders/:id/approve'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], PaypalController.prototype, "approveOrder", null);
exports.PaypalController = PaypalController = __decorate([
    (0, common_1.Controller)('paypal'),
    __metadata("design:paramtypes", [paypal_service_1.PaypalService])
], PaypalController);
//# sourceMappingURL=paypal.controller.js.map