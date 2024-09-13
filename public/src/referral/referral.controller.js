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
exports.ReferralController = void 0;
const common_1 = require("@nestjs/common");
const referral_service_1 = require("./referral.service");
const get_user_decorator_1 = require("../common/decorator/get-user.decorator");
const accept_referral_dto_1 = require("./dto/accept_referral.dto");
const firebase_auth_guard_1 = require("../auth/guards/firebase-auth.guard");
let ReferralController = exports.ReferralController = class ReferralController {
    constructor(referralService) {
        this.referralService = referralService;
    }
    async acceptReferral(body, userId) {
        return this.referralService.acceptReferral(body.referralCode, userId);
    }
    async getUserReferrals(userId) {
        return this.referralService.getUserReferrals(userId);
    }
    async getUserClaims(userId) {
        return this.referralService.getUserClaims(userId);
    }
    async claimUserReward(body, userId) {
        return this.referralService.claimUserReward(userId, body.mileStone);
    }
};
__decorate([
    (0, common_1.Post)('accept'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accept_referral_dto_1.AcceptReferralDto, String]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "acceptReferral", null);
__decorate([
    (0, common_1.Get)('count'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "getUserReferrals", null);
__decorate([
    (0, common_1.Get)('claims'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "getUserClaims", null);
__decorate([
    (0, common_1.Post)('claim'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [accept_referral_dto_1.MileStoneDto, String]),
    __metadata("design:returntype", Promise)
], ReferralController.prototype, "claimUserReward", null);
exports.ReferralController = ReferralController = __decorate([
    (0, common_1.Controller)('referral'),
    __metadata("design:paramtypes", [referral_service_1.ReferralService])
], ReferralController);
//# sourceMappingURL=referral.controller.js.map