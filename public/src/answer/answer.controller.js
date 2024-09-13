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
exports.AnswerController = void 0;
const common_1 = require("@nestjs/common");
const answer_service_1 = require("./answer.service");
const firebase_auth_guard_1 = require("../auth/guards/firebase-auth.guard");
const roles_decorator_1 = require("../common/decorator/roles.decorator");
const role_guard_1 = require("../common/guards/role.guard");
const answer_dto_1 = require("./dto/answer.dto");
const get_user_decorator_1 = require("../common/decorator/get-user.decorator");
let AnswerController = exports.AnswerController = class AnswerController {
    constructor(answerService) {
        this.answerService = answerService;
    }
    addAnswer(dto) {
        return this.answerService.addAnswer(dto);
    }
    updateAnswer(dto) {
        return this.answerService.updateAnswer(dto);
    }
    deleteAnswers(dto) {
        return this.answerService.deleteAnswers(dto.ids);
    }
    resetAnswers(userId, dto) {
        return this.answerService.resetAnswers(userId, dto.ids);
    }
    resetAnswersT(userId, dto) {
        return this.answerService.resetAnswersByTags(userId, dto.ids);
    }
    getAllAnswers() {
        return this.answerService.getAnswers();
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [answer_dto_1.AddAnswerDtoExtended]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "addAnswer", null);
__decorate([
    (0, common_1.Patch)(),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [answer_dto_1.UpdateAnswerDTO]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "updateAnswer", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [answer_dto_1.DeleteQuestionQueryDTO]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "deleteAnswers", null);
__decorate([
    (0, common_1.Post)('reset'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, answer_dto_1.ResetQuestionQueryDTO]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "resetAnswers", null);
__decorate([
    (0, common_1.Post)('resetT'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, answer_dto_1.ResetQuestionQueryDTO]),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "resetAnswersT", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AnswerController.prototype, "getAllAnswers", null);
exports.AnswerController = AnswerController = __decorate([
    (0, common_1.Controller)('answer'),
    __metadata("design:paramtypes", [answer_service_1.AnswerService])
], AnswerController);
//# sourceMappingURL=answer.controller.js.map