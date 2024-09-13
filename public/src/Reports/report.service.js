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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportSevice = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReportSevice = exports.ReportSevice = class ReportSevice {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addReport(uid, qid, reason) {
        return await this.prisma.reports.create({
            data: {
                userId: uid,
                questionId: qid,
                reason: reason,
            },
        });
    }
    async editReport(qid, reason) {
        return await this.prisma.reports.update({
            where: {
                id: qid
            },
            data: {
                reason: reason,
            },
        });
    }
    async clearReports(qid) {
        return await this.prisma.reports.deleteMany({
            where: {
                id: qid
            }
        });
    }
    async getUserReports(userId) {
        return await this.prisma.reports.findMany({
            where: {
                userId
            },
        });
    }
    async getReports(questionId, uid) {
        return await this.prisma.reports.findMany({
            where: {
                questionId,
                userId: uid
            },
            include: {
                user: {
                    select: {
                        displayName: true,
                        email: true,
                        id: true,
                    }
                }
            }
        });
    }
    async deleteReport(cid) {
        return await this.prisma.reports.delete({
            where: {
                id: cid
            }
        });
    }
};
exports.ReportSevice = ReportSevice = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReportSevice);
//# sourceMappingURL=report.service.js.map