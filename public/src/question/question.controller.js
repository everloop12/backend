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
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const question_service_1 = require("./question.service");
const firebase_auth_guard_1 = require("../auth/guards/firebase-auth.guard");
const roles_decorator_1 = require("../common/decorator/roles.decorator");
const role_guard_1 = require("../common/guards/role.guard");
const add_question_dto_1 = require("./dto/add_question.dto");
const category_dto_1 = require("../category/dto/category.dto");
const paginator_1 = require("../prisma/paginator");
const get_user_decorator_1 = require("../common/decorator/get-user.decorator");
let QuestionController = exports.QuestionController = class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
    }
    getAllQuestions(search, page) {
        return this.questionService.getQuestions(search, page || 1);
    }
    initQ() {
        return this.questionService.initQuests();
    }
    getUserData(uid) {
        return this.questionService.getUserData(uid);
    }
    addQuestion(dto) {
        return this.questionService.addQuestion(dto);
    }
    updateQuestion(id, dto) {
        return this.questionService.updateQuestion(id, dto);
    }
    deleteQuestions(dto) {
        return this.questionService.deleteQuestions(dto.ids);
    }
    deleteAll() {
        return this.questionService.deleteAll();
    }
    getSpecificQuestion(id) {
        return this.questionService.getSaidQuestion(id);
    }
    getQuestionsByCategory(uid, paginationQuery, dto) {
        return this.questionService.getQuestionsByMultCategory(paginationQuery, uid, dto.categories ?? [], dto.tags ?? [], dto.revision ?? false, dto.history ?? false, dto.pageNumber ?? 0);
    }
};
__decorate([
    (0, common_1.Post)('page'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)('search')),
    __param(1, (0, common_1.Body)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_question_dto_1.SearchQDTO, Number]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "getAllQuestions", null);
__decorate([
    (0, common_1.Post)('initQuest'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "initQ", null);
__decorate([
    (0, common_1.Get)('getUserData'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "getUserData", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_question_dto_1.AddQuestionDto]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "addQuestion", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, add_question_dto_1.UpdateQuestionDTO]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "updateQuestion", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_question_dto_1.DeleteQuestionQueryDTO]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "deleteQuestions", null);
__decorate([
    (0, common_1.Delete)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "deleteAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "getSpecificQuestion", null);
__decorate([
    (0, common_1.Post)('filteredQuestion'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, paginator_1.PaginationQueryDto, category_dto_1.ExamPrepDto]),
    __metadata("design:returntype", void 0)
], QuestionController.prototype, "getQuestionsByCategory", null);
exports.QuestionController = QuestionController = __decorate([
    (0, common_1.Controller)('question'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
//# sourceMappingURL=question.controller.js.map