import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(readonly prisma: PrismaService) { }

  async addTag(dto: TagDto) {
    // throw exception if tag already exists
    try {
      return await this.prisma.tag.create({
        data: dto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Tag already exists');
      }

      throw error;
    }
  }

  async updateTag(id: string, dto: TagDto) {
    try {
      return await this.prisma.tag.update({
        where: {
          id,
        },
        data: dto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Tag already exists');
      }
      throw error;
    }
  }

  async deleteTags(id: string, tags: string[]) {
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

  async getAnswersByTags(uid: string) {
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
}
