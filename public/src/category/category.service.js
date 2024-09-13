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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoryService = exports.CategoryService = class CategoryService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async addCategory(dto) {
        try {
            return await this.prisma.category.create({
                data: dto,
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Category already exists');
            }
            throw error;
        }
    }
    async updateCategory(id, dto) {
        try {
            return await this.prisma.category.update({
                where: {
                    id,
                },
                data: dto,
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Category already exists');
            }
            throw error;
        }
    }
    async deleteCategories(id, categories) {
        const afectedQuestions = await this.prisma.question.findMany({
            where: {
                categoryIds: {
                    hasSome: categories
                }
            }
        });
        afectedQuestions.forEach(async (question) => {
            await this.prisma.question.update({
                where: {
                    id: question.id
                },
                data: {
                    categoryIds: question.categoryIds.filter(categoryId => !categories.includes(categoryId))
                }
            });
        });
        return await this.prisma.category.deleteMany({
            where: {
                id: {
                    in: categories,
                }
            },
        });
    }
    async getAllCategories() {
        return await this.prisma.category.findMany({
            include: {
                _count: {
                    select: {
                        questions: true
                    }
                }
            }
        });
    }
    async getAnswersByCategories(uid) {
        const date = await this.prisma.user.findFirstOrThrow({
            where: { id: uid }, select: {
                lastPackageExpiry: true
            }
        });
        let premium = false;
        if (!date.lastPackageExpiry)
            premium = false;
        else
            premium = new Date(Date.now()).getTime() < new Date((date.lastPackageExpiry)).getTime();
        return await this.prisma.category.findMany({
            where: {
                name: premium ? {
                    not: {
                        contains: "trial"
                    }
                } : {
                    contains: 'trial'
                }
            },
            select: {
                id: true,
                name: true,
                averageRating: true,
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
    async getUserAnalytics(uid) {
        return await this.prisma.category.findMany({
            include: {
                questions: {
                    include: {
                        answers: {
                            where: {
                                userId: uid
                            }
                        }
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
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CategoryService);
//# sourceMappingURL=category.service.js.map