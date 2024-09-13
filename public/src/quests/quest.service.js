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
exports.QuestSevice = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let QuestSevice = exports.QuestSevice = class QuestSevice {
    constructor(prisma) {
        this.prisma = prisma;
        this.getRandomElements = (array, count) => {
            const shuffled = array.slice();
            let i = array.length;
            const result = [];
            while (i-- && count) {
                const index = Math.floor((i + 1) * Math.random());
                result.push(shuffled[index]);
                shuffled[index] = shuffled[i];
                count--;
            }
            return result;
        };
    }
    async addQuest(dto) {
        const { uid, ...rest } = dto;
        return await this.prisma.quest.create({
            data: {
                user: { connect: { id: uid } },
                ...rest,
            },
        });
    }
    async initializeUserQuests(uid) {
        const cates = ["Cardiology", "Endocrinology", "Gastroenterology",
            "Generics", "Hematology", "Nephrology",
            "Neurology", "Orthopedics", "Pediatrics",
            "Respiratory", "Rheumatology", "Surgery", "Women's Health"];
        const soloQuests = [
            {
                uid: uid,
                tag: "QUESTION",
                currentProgress: 0,
                goal: 10,
                rotation: 1,
                reward: 20,
            },
            {
                uid: uid,
                tag: "QUESTION",
                currentProgress: 0,
                goal: 15,
                rotation: 2,
                reward: 35,
            },
            {
                uid: uid,
                tag: "QUESTION",
                currentProgress: 0,
                goal: 20,
                rotation: 3,
                reward: 50,
            },
        ];
        const quests = [
            {
                uid: uid,
                tag: "QUESTION",
                currentProgress: 0,
                goal: 20,
                reward: 50,
            },
            {
                uid: uid,
                tag: "EXAM",
                currentProgress: 0,
                goal: 1,
                reward: 20,
            },
            {
                uid: uid,
                tag: "LOGIN",
                currentProgress: 0,
                goal: 1,
                reward: 20,
            },
        ];
        const acheivments = [
            {
                uid: uid,
                tag: "QUESTION",
                currentProgress: 0,
                frequency: "BADGE",
                goal: 100,
                reward: 200,
            },
            {
                uid: uid,
                tag: "QUESTION",
                currentProgress: 0,
                frequency: "BADGE",
                goal: 300,
                reward: 200,
            },
            {
                uid: uid,
                tag: "QUESTION",
                currentProgress: 0,
                frequency: "BADGE",
                goal: 500,
                reward: 200,
            },
            {
                uid: uid,
                tag: "QUESTION",
                currentProgress: 0,
                frequency: "BADGE",
                goal: 1000,
                reward: 200,
            }
        ];
        const randomElements = this.getRandomElements(cates, 3);
        const randomCatQuests = soloQuests.map((x, i) => ({
            ...x,
            ref: randomElements[i]
        }));
        for (const cate in cates) {
            const perCategoryAcheivments = acheivments.map((x, i) => {
                return {
                    ...x,
                    ref: cates[cate] + " " + String(i),
                };
            });
            await this.prisma.quest.createMany({
                data: perCategoryAcheivments
            });
        }
        return await this.prisma.quest.createMany({
            data: [...randomCatQuests, ...quests],
        });
    }
    async updateQuests() {
        return this.prisma.quest.updateMany({
            data: {
                frequency: "DAILY"
            }
        });
    }
    async deleteUserQuests(uid) {
        return await this.prisma.quest.deleteMany({
            where: {
                uid,
            },
        });
    }
    async getQuests() {
        return await this.prisma.quest.findMany({});
    }
    async getUserQuests(uid) {
        return await this.prisma.quest.findMany({
            where: {
                uid,
                NOT: {
                    frequency: "BADGE"
                }
            },
        });
    }
    async getUserBadges(uid) {
        return await this.prisma.quest.findMany({
            where: {
                uid,
                frequency: "BADGE",
            },
        });
    }
    async deleteQuests() {
        return await this.prisma.quest.deleteMany({});
    }
    async resetQuests() {
        const cates = ["Cardiology", "Endocrinology", "Gastroenterology",
            "Generics", "Hematology", "Nephrology",
            "Neurology", "Orthopedics", "Pediatrics",
            "Respiratory", "Rheumatology", "Surgery", "Women's Health"];
        const rotCat = this.getRandomElements(cates, 3);
        await this.prisma.quest.updateMany({
            where: {
                rotation: 1
            },
            data: {
                ref: rotCat[0]
            }
        });
        await this.prisma.quest.updateMany({
            where: {
                rotation: 2
            },
            data: {
                ref: rotCat[1]
            }
        });
        await this.prisma.quest.updateMany({
            where: {
                rotation: 3
            },
            data: {
                ref: rotCat[2]
            }
        });
        return await this.prisma.quest.updateMany({
            data: {
                currentProgress: 0,
                cleared: false,
            },
        });
    }
    async progressLogin(uid) {
        return await this.progressQuests("LOGIN", uid);
    }
    async progressQuests(tag, uid, ref) {
        await this.prisma.quest.updateMany({
            where: {
                currentProgress: {
                    lt: this.prisma.quest.fields.goal,
                },
                tag: tag,
                uid: uid,
                ref: ref ? {
                    contains: ref
                } : {
                    isSet: false
                }
            },
            data: {
                currentProgress: {
                    increment: 1,
                },
            },
        });
        const finishedQuests = await this.prisma.quest.findMany({
            where: {
                currentProgress: {
                    equals: this.prisma.quest.fields.goal,
                },
                cleared: false,
            },
        });
        if (finishedQuests) {
            const ids = finishedQuests.map((x) => x.id);
            const xp = finishedQuests.map((x) => x.reward);
            let SumOfXp = 0;
            xp.forEach((points) => {
                SumOfXp += points;
            });
            if (SumOfXp !== 0) {
                await this.prisma.quest.updateMany({
                    where: {
                        id: {
                            in: ids
                        }
                    }, data: {
                        cleared: true
                    }
                });
                this.prisma.user.findFirst({
                    where: {
                        id: uid
                    },
                }).then(async (data) => {
                    if (!data)
                        return ({ message: "User not found" });
                    await this.prisma.user.update({
                        where: {
                            id: uid
                        },
                        data: {
                            xp: (data?.xp || 0) + SumOfXp
                        }
                    });
                });
            }
        }
        return finishedQuests.map((e) => ({ ...e, cleared: true }));
    }
};
exports.QuestSevice = QuestSevice = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuestSevice);
//# sourceMappingURL=quest.service.js.map