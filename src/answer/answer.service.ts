import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddAnswerDto, AddAnswerDtoExtended, UpdateAnswerDTO } from './dto/answer.dto';
import { QuestSevice } from 'src/quests/quest.service';
import { UserService } from 'src/user/user.service';
import { fa } from '@faker-js/faker';

@Injectable()
export class AnswerService {
  constructor(readonly prisma: PrismaService, private questService: QuestSevice, private userService: UserService) { }

  async getAnswerById(id: string) {
    return await this.prisma.answer.findUnique({
      where: {
        id,
      }
    });
  }

  async updateAnswer(data: UpdateAnswerDTO) {
    const { id, ...rest } = data;
    return await this.prisma.answer.update({
      where: {
        id: id
      },
      data: rest
    })
  }

  async deleteAnswers(ids: string[]) {
    return await this.prisma.answer.deleteMany({
      where: {
        id: {
          in: ids
        }
      }
    })
  }

  async deleteAnswer(id: string) {
    return await this.prisma.answer.deleteMany({
      where: {
        id: id
      }
    })
  }

  async resetAnswers(uid: string, categories: string[]) {
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
    })
  }

  async resetAnswersByTags(uid: string, tags: string[]) {
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
    })
  }


  async getAnswers() {
    return await this.prisma.answer.findMany();
  }

  async addAnswer(dto: AddAnswerDtoExtended) {
    const { categories, ...rest } = dto
    return await this.prisma.answer.create({
      data: rest
    }).then(async (data) => {
      this.questService.progressQuests("QUESTION", dto.userId)
      if (dto?.categories?.[0] || false)
        this.questService.progressQuests("QUESTION", dto.userId, dto.categories[0])
      this.userService.updateStreak(dto.userId, dto.isCorrect)
      // this.questService
      return data
    })
  }
}
