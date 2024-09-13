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
exports.StatsSevice = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StatsSevice = exports.StatsSevice = class StatsSevice {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats() {
        return await this.prisma.statistics.findMany({});
    }
    async calculateStats() {
        console.log("Calculating stats....");
        const users = await this.prisma.user.findMany({
            where: {
                role: "STUDENT"
            }
        });
        const categories = await this.prisma.category.findMany({
            include: {
                questions: {
                    include: {
                        answers: true
                    }
                }
            }
        });
        categories.forEach(async (cat) => {
            users.forEach(async (user) => {
                const answers = cat.questions.map(x => x.answers.filter(x => x.userId == user.id)).flat();
                const correctAnswers = answers.filter(answer => answer.isCorrect);
                const incorrectAnswers = answers.filter(answer => !answer.isCorrect);
                const correctAnswersCount = correctAnswers.length;
                const incorrectAnswersCount = incorrectAnswers.length;
                const activeCorrectAnswersCount = correctAnswers.filter(x => !x.deleted).length;
                const activeIncorrectAnswersCount = incorrectAnswers.filter(x => !x.deleted).length;
                const performance = (correctAnswersCount + incorrectAnswersCount) === 0 ? 0 : correctAnswersCount / (correctAnswersCount + incorrectAnswersCount) * 100;
                const activePerformance = (activeCorrectAnswersCount + activeIncorrectAnswersCount) === 0 ? 0 : activeCorrectAnswersCount / (activeCorrectAnswersCount + activeIncorrectAnswersCount) * 100;
                const stat = await this.prisma.statistics.findMany({
                    where: {
                        userId: user.id,
                        categoryId: cat.id
                    }
                });
                if (stat.length > 0) {
                    await this.prisma.statistics.updateMany({
                        where: {
                            userId: user.id,
                            categoryId: cat.id
                        },
                        data: {
                            questionCount: (correctAnswersCount + incorrectAnswersCount),
                            activeQuestionCount: (activeCorrectAnswersCount + activeIncorrectAnswersCount),
                            performance,
                            activePerformance,
                        }
                    });
                }
                else {
                    await this.prisma.statistics.create({
                        data: {
                            userId: user.id,
                            categoryId: cat.id,
                            questionCount: (correctAnswersCount + incorrectAnswersCount),
                            activeQuestionCount: (activeCorrectAnswersCount + activeIncorrectAnswersCount),
                            performance,
                            activePerformance,
                        }
                    });
                }
            });
        });
        console.log("Done calculating stats....");
    }
};
exports.StatsSevice = StatsSevice = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StatsSevice);
//# sourceMappingURL=stats.service.js.map