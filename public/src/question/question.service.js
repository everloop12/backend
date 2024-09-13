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
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const quest_service_1 = require("../quests/quest.service");
const paginator_1 = require("../prisma/paginator");
const paginate = (0, paginator_1.paginator)({ perPage: 10 });
let QuestionService = exports.QuestionService = class QuestionService {
    constructor(prisma, questService) {
        this.prisma = prisma;
        this.questService = questService;
    }
    async getQuestionById(id) {
        return await this.prisma.question.findUnique({
            where: {
                id,
            },
            include: {
                categories: true,
            },
        });
    }
    async getQuestionsByCategory(categoryId) {
        const questions = await this.prisma.question.findMany({
            select: {
                choices: {
                    select: {
                        text: true,
                    },
                },
            },
            where: {
                categories: {
                    some: {
                        id: categoryId,
                    },
                },
            },
        });
        questions.forEach(question => {
            question.choices = this.shuffleArray(question.choices);
        });
        return questions;
    }
    async updateQuestion(id, dto) {
        const { id: dummyId, ...rest } = dto;
        return await this.prisma.question.update({
            where: {
                id: id
            },
            data: {
                ...rest,
                choices: [...rest.choices.map(choice => ({ ...choice }))],
            }
        });
    }
    async deleteQuestions(ids) {
        return await this.prisma.question.deleteMany({
            where: {
                id: {
                    in: ids,
                }
            }
        });
    }
    async deleteAll() {
        return this.prisma.question.deleteMany();
    }
    async getQuestionsByMultCategory(paginationDto, uid, categories, tags, revision, history, pageNumber) {
        let questions;
        const date = await this.prisma.user.findFirstOrThrow({ where: { id: uid } });
        let premium = false;
        if (!date.lastPackageExpiry)
            premium = false;
        else
            premium = new Date(Date.now()).getTime() < new Date((date.lastPackageExpiry)).getTime();
        if (categories.length > 0 || tags.length > 0)
            questions = await this.prisma.question.findMany({
                where: {
                    categoryIds: categories.length === 0 ? undefined : {
                        hasSome: categories
                    },
                    categories: premium ? {
                        none: {
                            name: {
                                contains: "trial"
                            }
                        }
                    } : {
                        some: {
                            name: {
                                contains: "trial"
                            }
                        }
                    },
                    tagIds: tags.length === 0 ? undefined : {
                        hasSome: tags
                    },
                    answers: !(revision || history) ? {
                        none: {
                            userId: uid,
                            deleted: false
                        }
                    } : {
                        some: {
                            userId: uid,
                            deleted: history ? undefined : false,
                            isCorrect: history ? undefined : false
                        }
                    }
                },
                include: revision ? undefined : {
                    answers: {
                        where: {
                            userId: uid,
                            deleted: false,
                        }
                    },
                    Comments: true,
                    Reports: true,
                    _count: {}
                },
                take: 30,
                skip: pageNumber * 30,
            });
        else
            questions = await this.prisma.question.findMany({
                where: {
                    categories: premium ? {
                        none: {
                            name: {
                                contains: "trial"
                            }
                        }
                    } : {
                        some: {
                            name: {
                                contains: "trial"
                            }
                        }
                    },
                    answers: !(revision || history) ? {
                        none: {
                            userId: uid,
                            deleted: false
                        }
                    } : {
                        some: {
                            userId: uid,
                            deleted: history ? undefined : false,
                            isCorrect: history ? undefined : false
                        }
                    }
                },
                include: revision ? undefined : {
                    answers: {
                        where: {
                            userId: uid,
                            deleted: false,
                        }
                    },
                    Comments: true,
                    Reports: true,
                },
                take: 30,
                skip: pageNumber * 30,
            });
        const statistics = await this.prisma.question.findMany({
            where: {
                id: {
                    in: questions.map((q) => q.id)
                }
            },
            select: {
                id: true,
                answers: {
                    where: {
                        deleted: false
                    },
                    select: {
                        user: {
                            select: {
                                country: true,
                                university: true
                            }
                        }
                    }
                }
            },
        });
        this.questService.progressQuests("EXAM", uid);
        return { questions: questions, stats: statistics };
    }
    async getSaidQuestion(id) {
        if (id == 'none')
            return { status: 200, success: true };
        else
            return await this.prisma.question.findUnique({
                where: {
                    id,
                },
                include: {
                    categories: true,
                    tags: true,
                },
            });
    }
    async getQuestions(search, pagen) {
        const page = pagen || 1;
        const perPage = 50;
        const skip = (page - 1) * perPage;
        console.log('perPage', perPage);
        console.log('skip', skip);
        console.log('search', search);
        return await this.prisma.question.findMany({
            where: {
                question: !search.text ? undefined : {
                    contains: search.text,
                    mode: 'insensitive'
                },
                categories: !search.categories ? undefined : {
                    some: {
                        id: search.categories
                    }
                },
                tags: !search.tags ? undefined : {
                    some: {
                        id: search.tags
                    }
                },
            },
            include: {
                _count: {
                    select: {
                        Comments: true,
                        Reports: true
                    },
                },
                Comments: true,
                Reports: true,
                categories: true,
                tags: true,
            },
            orderBy: {
                Reports: {
                    _count: 'desc'
                }
            },
            skip: skip,
            take: perPage,
        });
    }
    async initQuests() {
        await this.prisma.quest.deleteMany({});
        const users = await this.prisma.user.findMany({});
        for (const user of users) {
            await this.questService.initializeUserQuests(user.id);
        }
    }
    async getUserData(uid) {
        const date = await this.prisma.user.findFirstOrThrow({ where: { id: uid } });
        let premium = false;
        if (!date.lastPackageExpiry)
            premium = false;
        else
            premium = new Date(Date.now()).getTime() < new Date((date.lastPackageExpiry)).getTime();
        const statistics = await this.prisma.question.findMany({
            select: {
                id: true,
                answers: {
                    where: {
                        deleted: false,
                        question: {
                            categories: premium ? {
                                none: {
                                    name: {
                                        contains: "trial"
                                    }
                                }
                            } : {
                                some: {
                                    name: {
                                        contains: "trial"
                                    }
                                }
                            }
                        }
                    },
                    select: {
                        user: {
                            select: {
                                country: true,
                                university: true
                            }
                        }
                    }
                }
            },
        });
        const questions = await this.prisma.question.findMany({
            where: {
                categories: premium ? {
                    none: {
                        name: {
                            contains: "trial"
                        }
                    }
                } : {
                    some: {
                        name: {
                            contains: "trial"
                        }
                    }
                }
            },
            include: {
                answers: {
                    where: {
                        userId: uid,
                        deleted: false,
                    }
                }
            }
        });
        const tags = await this.prisma.tag.findMany({});
        const categories = await this.prisma.category.findMany({
            where: {
                name: premium ? {
                    not: {
                        contains: "trial"
                    }
                } : {
                    contains: "trial"
                }
            }
        });
        return {
            questions,
            tags,
            categories,
            stats: statistics
        };
    }
    shuffleArray(array = []) {
        return array;
    }
    async addQuestion(dto) {
        const { categoryIds, tagIds, choices, ...rest } = dto;
        return await this.prisma.question.create({
            data: {
                ...rest,
                categoryIds,
                tagIds,
                choices: [...choices.map(choice => ({ ...choice }))],
                categories: {
                    connect: categoryIds.map(id => ({ id })),
                },
                tags: {
                    connect: tagIds.map(id => ({ id })),
                }
            },
        });
    }
};
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, quest_service_1.QuestSevice])
], QuestionService);
//# sourceMappingURL=question.service.js.map