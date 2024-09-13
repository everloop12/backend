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
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const quest_service_1 = require("../quests/quest.service");
const user_service_1 = require("../user/user.service");
let AnswerService = exports.AnswerService = class AnswerService {
    constructor(prisma, questService, userService) {
        this.prisma = prisma;
        this.questService = questService;
        this.userService = userService;
    }
    async getAnswerById(id) {
        return await this.prisma.answer.findUnique({
            where: {
                id,
            }
        });
    }
    async updateAnswer(data) {
        const { id, ...rest } = data;
        return await this.prisma.answer.update({
            where: {
                id: id
            },
            data: rest
        });
    }
    async deleteAnswers(ids) {
        return await this.prisma.answer.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
    }
    async deleteAnswer(id) {
        return await this.prisma.answer.deleteMany({
            where: {
                id: id
            }
        });
    }
    async resetAnswers(uid, categories) {
        return await this.prisma.answer.updateMany({
            where: {
                userId: uid,
                question: categories.length > 0 ? {
                    categoryIds: {
                        hasSome: categories
                    }
                } : undefined,
                deleted: false,
            },
            data: {
                deleted: true
            }
        });
    }
    async resetAnswersByTags(uid, tags) {
        return await this.prisma.answer.updateMany({
            where: {
                userId: uid,
                question: tags.length > 0 ? {
                    tagIds: {
                        hasSome: tags
                    }
                } : undefined,
                deleted: false
            },
            data: {
                deleted: true
            }
        });
    }
    async getAnswers() {
        return await this.prisma.answer.findMany();
    }
    async addAnswer(dto) {
        const { categories, ...rest } = dto;
        return await this.prisma.answer.create({
            data: rest
        }).then(async (data) => {
            this.questService.progressQuests("QUESTION", dto.userId);
            if (dto?.categories?.[0] || false)
                this.questService.progressQuests("QUESTION", dto.userId, dto.categories[0]);
            this.userService.updateStreak(dto.userId, dto.isCorrect);
            return data;
        });
    }
};
exports.AnswerService = AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, quest_service_1.QuestSevice, user_service_1.UserService])
], AnswerService);
//# sourceMappingURL=answer.service.js.map