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
exports.QuestContoller = void 0;
const common_1 = require("@nestjs/common");
const firebase_auth_guard_1 = require("../auth/guards/firebase-auth.guard");
const quest_service_1 = require("./quest.service");
const quest_dto_1 = require("./dto/quest.dto");
const get_user_decorator_1 = require("../common/decorator/get-user.decorator");
const schedule_1 = require("@nestjs/schedule");
let QuestContoller = exports.QuestContoller = class QuestContoller {
    constructor(questService) {
        this.questService = questService;
    }
    getallQuests() {
        return this.questService.getQuests();
    }
    getUserStuff(userId) {
        return this.questService.getUserBadges(userId);
    }
    getOtherUserStuff(uid) {
        return this.questService.getUserBadges(uid);
    }
    getUserQuests(userId) {
        return this.questService.getUserQuests(userId);
    }
    addQuestion(dto) {
        return this.questService.addQuest(dto);
    }
    progress(dto) {
        return this.questService.progressQuests(dto.tag, dto.uid);
    }
    async handleQuestResetCron() {
        return this.questService.resetQuests();
    }
    progressLogin(dto) {
        return this.questService.progressLogin(dto.uid);
    }
    deleteAll() {
        return this.questService.deleteQuests();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestContoller.prototype, "getallQuests", null);
__decorate([
    (0, common_1.Get)('/badges'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestContoller.prototype, "getUserStuff", null);
__decorate([
    (0, common_1.Get)('badges/:uid'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestContoller.prototype, "getOtherUserStuff", null);
__decorate([
    (0, common_1.Get)(":uid"),
    __param(0, (0, common_1.Param)("uid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestContoller.prototype, "getUserQuests", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [quest_dto_1.QuestDTO]),
    __metadata("design:returntype", void 0)
], QuestContoller.prototype, "addQuestion", null);
__decorate([
    (0, common_1.Post)("prog"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestContoller.prototype, "progress", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestContoller.prototype, "handleQuestResetCron", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], QuestContoller.prototype, "progressLogin", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestContoller.prototype, "deleteAll", null);
exports.QuestContoller = QuestContoller = __decorate([
    (0, common_1.Controller)("quest"),
    __metadata("design:paramtypes", [quest_service_1.QuestSevice])
], QuestContoller);
//# sourceMappingURL=quest.controller.js.map