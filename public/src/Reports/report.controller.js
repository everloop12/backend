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
exports.ReportContoller = void 0;
const common_1 = require("@nestjs/common");
const firebase_auth_guard_1 = require("../auth/guards/firebase-auth.guard");
const roles_decorator_1 = require("../common/decorator/roles.decorator");
const role_guard_1 = require("../common/guards/role.guard");
const report_service_1 = require("./report.service");
const get_user_decorator_1 = require("../common/decorator/get-user.decorator");
let ReportContoller = exports.ReportContoller = class ReportContoller {
    constructor(reportService) {
        this.reportService = reportService;
    }
    editReport(qid, dto) {
        return this.reportService.editReport(qid, dto.reason);
    }
    getUserReports(uid) {
        return this.reportService.getUserReports(uid);
    }
    getReports(qid, uid) {
        return this.reportService.getReports(qid, uid);
    }
    addReport(uid, qid, dto) {
        return this.reportService.addReport(uid, qid, dto.reason);
    }
    clearReports(qid) {
        return this.reportService.clearReports(qid);
    }
};
__decorate([
    (0, common_1.Patch)(':qid'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Param)('qid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ReportContoller.prototype, "editReport", null);
__decorate([
    (0, common_1.Get)('user/:uid'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportContoller.prototype, "getUserReports", null);
__decorate([
    (0, common_1.Get)(':qid'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, common_1.Param)('qid')),
    __param(1, (0, get_user_decorator_1.GetUser)('uid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ReportContoller.prototype, "getReports", null);
__decorate([
    (0, common_1.Post)(':qid'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)('uid')),
    __param(1, (0, common_1.Param)('qid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ReportContoller.prototype, "addReport", null);
__decorate([
    (0, common_1.Delete)(':qid'),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard, role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('ADMIN'),
    __param(0, (0, common_1.Param)('qid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReportContoller.prototype, "clearReports", null);
exports.ReportContoller = ReportContoller = __decorate([
    (0, common_1.Controller)("reports"),
    __metadata("design:paramtypes", [report_service_1.ReportSevice])
], ReportContoller);
//# sourceMappingURL=report.controller.js.map