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
exports.CommentSevice = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CommentSevice = exports.CommentSevice = class CommentSevice {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addComment(uid, qid, text, rating) {
        return await this.prisma.comments.create({
            data: {
                userId: uid,
                questionId: qid,
                text: text,
                rating: rating
            },
        });
    }
    async editComment(qid, text, rating) {
        return await this.prisma.comments.update({
            where: {
                id: qid
            },
            data: {
                text: text,
                rating: rating,
            },
        });
    }
    async getUserComments(userId) {
        return await this.prisma.comments.findMany({
            where: {
                userId
            },
        });
    }
    async getComments(questionId) {
        return await this.prisma.comments.findMany({
            where: {
                questionId
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
    async deleteComment(cid) {
        return await this.prisma.comments.delete({
            where: {
                id: cid
            }
        });
    }
};
exports.CommentSevice = CommentSevice = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentSevice);
//# sourceMappingURL=comment.service.js.map