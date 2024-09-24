/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddQuestionDto, SearchQDTO, UpdateQuestionDTO } from './dto/add_question.dto';
import { QuestSevice } from 'src/quests/quest.service';
import { PaginateFunction, PaginatedResult, PaginationQueryDto, paginator } from '../prisma/paginator';
import { Question } from '@prisma/client';

// import * as fs from 'fs';
// import * as path from 'path';
// import glob from 'glob';

const paginate: PaginateFunction = paginator({ perPage: 10 });

@Injectable()
export class QuestionService {
  constructor(readonly prisma: PrismaService, private questService: QuestSevice) { }


  

  async getQuestionById(id: string) {
    return await this.prisma.question.findUnique({
      where: {
        id,
      },
      include: {
        categories: true,
      },
    });
  }

  async getQuestionsByCategory(categoryId: string) {
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

    // shuffle choices
    questions.forEach(question => {
      question.choices = this.shuffleArray(question.choices);
    });

    return questions;
  }

  async updateQuestion(id: string, dto: UpdateQuestionDTO) {
    const { id: dummyId, ...rest } = dto;
    return await this.prisma.question.update({
      where: {
        id: id
      },
      data: {
        ...rest,
        choices: [...rest.choices.map(choice => ({ ...choice }))],
      }
    })
  }


  async deleteQuestions(ids: string[]) {
    return await this.prisma.question.deleteMany({
      where: {
        id: {
          in: ids,
        }
      }
    })
  }

  async deleteAll() {
    return this.prisma.question.deleteMany()
  }

  async getQuestionsByMultCategory(paginationDto: PaginationQueryDto, uid: string, categories: string[], tags: string[], revision?: boolean, history?: boolean, pageNumber?: number) {
    let questions: any;
    const date = await this.prisma.user.findFirstOrThrow({ where: { id: uid } })
    let premium = false;

    if (!date.lastPackageExpiry)
      premium = false
    else
      premium = new Date(Date.now()).getTime() < new Date((date.lastPackageExpiry)).getTime()


    if (categories.length > 0 || tags.length > 0)
      questions = await this.prisma.question.findMany(
        {
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
            _count: {

            }
          },
          take: 30,
          skip: pageNumber * 30,
        })
    else
      questions = await this.prisma.question.findMany(
        {
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
        })

    const statistics = await this.prisma.question.findMany({
      where:{
        id:{
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
          // include: {
          //   user: {
          //     select: {
          //       country: true,
          //       university: true
          //     }
          //   }
          // }
        }
      },
    })


    this.questService.progressQuests("EXAM", uid)
    return { questions: questions, stats: statistics };
  }

  async getSaidQuestion(id: string) {
    if (id == 'none')
      return { status: 200, success: true }
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


  async getQuestions(search: SearchQDTO, pagen: number) {
    // const { page, perPage } = paginationQuery
    const page = pagen || 1;
    const perPage = 50;
    const skip = (page - 1) * perPage
    console.log('perPage', perPage)
    console.log('skip', skip)

    console.log('search', search)

    return await this.prisma.question.findMany({
      // TODO: make the search query will be more detailed and will be AND instead of an OR
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
    await this.prisma.quest.deleteMany({})
    const users = await this.prisma.user.findMany({})
    for (const user of users) {
      await this.questService.initializeUserQuests(user.id)
    }
  }

  async getUserData(uid: string) {
    const date = await this.prisma.user.findFirstOrThrow({ where: { id: uid } });
    let premium = false;
  
    if (date.lastPackageExpiry) {
      premium = new Date(Date.now()).getTime() < new Date(date.lastPackageExpiry).getTime();
    }
  
    // Fetch statistics without filtering for trial questions
    const statistics = await this.prisma.question.findMany({
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
                university: true,
              }
            }
          }
        }
      },
    });
  
    // Fetch questions without filtering for trial categories
    const questions = await this.prisma.question.findMany({
      include: {
        answers: {
          where: {
            userId: uid,
            deleted: false,
          }
        }
      }
    });
  
    // Fetch all tags and categories without filtering for "trial"
    const tags = await this.prisma.tag.findMany({});
    const categories = await this.prisma.category.findMany({});
  
    return {
      questions,
      tags,
      categories,
      stats: statistics,
    };
  }
  

  private shuffleArray(array = []) {
    return array;
  }

  async addQuestion(dto: AddQuestionDto) {
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

    })

  }
}
