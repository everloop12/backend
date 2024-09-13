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
exports.CommentContoller = void 0;
const common_1 = require("@nestjs/common");
const firebase_auth_guard_1 = require("../auth/guards/firebase-auth.guard");
const roles_decorator_1 = require("../common/decorator/roles.decorator");
const role_guard_1 = require("../common/guards/role.guard");
const comment_service_1 = require("./comment.service");
const get_user_decorator_1 = require("../common/decorator/get-user.decorator");
let CommentContoller = exports.CommentContoller = class CommentContoller {
    constructor(commentService) {
        this.commentService = commentService;
    }
    deleteComment(cid) {
        return this.commentService.deleteComment(cid);
    }
    editComment(qid, dto) {
        return this.commentService.editComment(qid, dto.text, dto.rating);
    }
    getUserComments(uid) {
        return this.commentService.getUserComments(uid);
    }
    getQuestionComments(qid) {
        return this.commentService.getComments(qid);
    }
    addComment(uid, qid, dto) {
        return this.commentService.addComment(uid, qid, dto.text, dto.rating);
    }
};
__decorate([
    (0, common_1.Delete)(':cid'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Param)('cid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentContoller.prototype, "deleteComment", null);
__decorate([
    (0, common_1.Patch)(':qid'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Param)('qid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], CommentContoller.prototype, "editComment", null);
__decorate([
    (0, common_1.Get)('user/:uid'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentContoller.prototype, "getUserComments", null);
__decorate([
    (0, common_1.Get)(':qid'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Param)('qid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentContoller.prototype, "getQuestionComments", null);
__decorate([
    (0, common_1.Post)('add/:qid'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __param(1, (0, common_1.Param)('qid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], CommentContoller.prototype, "addComment", null);
exports.CommentContoller = CommentContoller = __decorate([
    (0, common_1.Controller)("comments"),
    __metadata("design:paramtypes", [comment_service_1.CommentSevice])
], CommentContoller);
//# sourceMappingURL=comment.controller.js.map