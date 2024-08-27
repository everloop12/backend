import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class StatsSevice {
  constructor(readonly prisma: PrismaService) { }


  async getStats() {
    return await this.prisma.statistics.findMany({})
  }

  async calculateStats() {
    // await this.prisma.statistics.deleteMany({})
    console.log("Calculating stats....")
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

    categories.forEach(async cat => {
      users.forEach(async user => {
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
        })
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
          })
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
          })
        }

      })
    })

    console.log("Done calculating stats....")
  }
}
