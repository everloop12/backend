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
exports.TagService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TagService = exports.TagService = class TagService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addTag(dto) {
        try {
            return await this.prisma.tag.create({
                data: dto,
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Tag already exists');
            }
            throw error;
        }
    }
    async updateTag(id, dto) {
        try {
            return await this.prisma.tag.update({
                where: {
                    id,
                },
                data: dto,
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Tag already exists');
            }
            throw error;
        }
    }
    async deleteTags(id, tags) {
        return await this.prisma.tag.deleteMany({
            where: {
                id: {
                    in: tags
                }
            },
        });
    }
    async getAllTags() {
        return await this.prisma.tag.findMany({
            include: {
                _count: {
                    select: {
                        questions: true
                    }
                }
            }
        });
    }
    async getAnswersByTags(uid) {
        return await this.prisma.tag.findMany({
            select: {
                id: true,
                name: true,
                questions: {
                    select: {
                        id: true,
                        answers: {
                            where: {
                                userId: uid,
                                deleted: false
                            },
                            select: {
                                isCorrect: true,
                            }
                        },
                    }
                },
                _count: {
                    select: {
                        questions: true
                    }
                }
            }
        });
    }
};
exports.TagService = TagService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TagService);
//# sourceMappingURL=tag.service.js.map