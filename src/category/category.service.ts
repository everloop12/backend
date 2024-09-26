import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(readonly prisma: PrismaService) { }

  async addCategory(dto: CategoryDto) {
    // throw exception if category already exists
    try {
      return await this.prisma.category.create({
        data: dto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Category already exists');
      }

      throw error;
    }
  }

  async updateCategory(id: string, dto: CategoryDto) {
    try {
      return await this.prisma.category.update({
        where: {
          id,
        },
        data: dto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Category already exists');
      }
      throw error;
    }
  }

  async deleteCategories(id: string, categories: string[]) {
    const afectedQuestions = await this.prisma.question.findMany({
      where: {
        categoryIds: {
          hasSome: categories
        }
      }

    })

    afectedQuestions.forEach(async question => {
      await this.prisma.question.update({
        where: {
          id: question.id
        },
        data: {
          categoryIds: question.categoryIds.filter(categoryId => !categories.includes(categoryId))
        }
      })

    })

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

  async getAnswersByCategories(uid: string) {
    const date = await this.prisma.user.findFirstOrThrow({
      where: { id: uid },
      select: { lastPackageExpiry: true }
    });
  
    let premium = false;
    if (date.lastPackageExpiry) {
      premium = new Date(Date.now()).getTime() < new Date(date.lastPackageExpiry).getTime();
    }
  
    // Fetch categories and their answers without filtering for "trial"
    return await this.prisma.category.findMany({
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
                deleted: false,
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
  
  //lazy comment for git redeploy 

  async getUserAnalytics(uid: string) {
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


}
