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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const use_guards_decorator_1 = require("@nestjs/common/decorators/core/use-guards.decorator");
const request_mapping_decorator_1 = require("@nestjs/common/decorators/http/request-mapping.decorator");
const client_1 = require("@prisma/client");
const firebase_auth_guard_1 = require("../auth/guards/firebase-auth.guard");
const roles_decorator_1 = require("../common/decorator/roles.decorator");
const role_guard_1 = require("../common/guards/role.guard");
const user_service_1 = require("./user.service");
const swagger_1 = require("@nestjs/swagger");
const get_user_decorator_1 = require("../common/decorator/get-user.decorator");
const quest_service_1 = require("../quests/quest.service");
let UserController = exports.UserController = class UserController {
    constructor(userService, qusetService) {
        this.userService = userService;
        this.qusetService = qusetService;
    }
    getUserInfo(userId) {
        this.qusetService.progressLogin(userId);
        return this.userService.getInfo(userId);
    }
    adjustProfileSettings(userId, dto) {
        return this.userService.changeSettings(userId, dto);
    }
    deleteUser(userId) {
        return this.userService.deleteUser(userId);
    }
    getAnalytics(userId) {
        return this.userService.getAnalytics(userId);
    }
    getStreak(userId) {
        return this.userService.getStreak(userId);
    }
    getSubscriptionStatus(userId) {
        return this.userService.getSubscriptionStatus(userId);
    }
    getHistory(userId, page) {
        return this.userService.getHistory(userId, page ?? 1);
    }
    async getUserAnswers(userId) {
        return await this.userService.getUserAnswers(userId);
    }
    getUserList() {
        return this.userService.getUserList();
    }
    getAllUsers(page) {
        console.log('page: ', page);
        return this.userService.getAll(page);
    }
    getUserInfoAdmin(userId) {
        return this.userService.getInfo(userId);
    }
    getOtherUserInfo(userId) {
        return this.userService.getOtherUserInfo(userId);
    }
    getUserXp(userId) {
        return this.userService.getXp(userId);
    }
};
__decorate([
    (0, request_mapping_decorator_1.Get)('profile'),
    (0, use_guards_decorator_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserInfo", null);
__decorate([
    (0, request_mapping_decorator_1.Patch)('settings'),
    (0, use_guards_decorator_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "adjustProfileSettings", null);
__decorate([
    (0, request_mapping_decorator_1.Delete)('me'),
    (0, use_guards_decorator_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, request_mapping_decorator_1.Get)('analytics'),
    (0, use_guards_decorator_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAnalytics", null);
__decorate([
    (0, request_mapping_decorator_1.Get)('streak'),
    (0, use_guards_decorator_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getStreak", null);
__decorate([
    (0, request_mapping_decorator_1.Get)('subscriptionStatus'),
    (0, use_guards_decorator_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getSubscriptionStatus", null);
__decorate([
    (0, request_mapping_decorator_1.Get)('history/:page'),
    (0, use_guards_decorator_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __param(1, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getHistory", null);
__decorate([
    (0, request_mapping_decorator_1.Get)('answers'),
    (0, use_guards_decorator_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserAnswers", null);
__decorate([
    (0, request_mapping_decorator_1.Get)('list'),
    (0, use_guards_decorator_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserList", null);
__decorate([
    (0, request_mapping_decorator_1.Get)('leaderBoard/:page'),
    (0, use_guards_decorator_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Param)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAllUsers", null);
__decorate([
    (0, request_mapping_decorator_1.Get)(':uid'),
    (0, use_guards_decorator_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserInfoAdmin", null);
__decorate([
    (0, request_mapping_decorator_1.Get)('info/:uid'),
    (0, use_guards_decorator_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getOtherUserInfo", null);
__decorate([
    (0, request_mapping_decorator_1.Get)(':uid/xp'),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserXp", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService, quest_service_1.QuestSevice])
], UserController);
//# sourceMappingURL=user.controller.js.map