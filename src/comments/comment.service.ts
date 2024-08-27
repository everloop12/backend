import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CommentDTO } from "./dto/comment.dto";

@Injectable()
export class CommentSevice {
  constructor(readonly prisma: PrismaService) { }

  async addComment(uid: string, qid: string, text: string, rating: number) {
    return await this.prisma.comments.create({
      data: {
        userId: uid,
        questionId: qid,
        text: text,
        rating: rating
      },
    });
  }

  async editComment(qid: string, text: string, rating: number) {
    return await this.prisma.comments.update({
      where: {
        id: qid
      },
      data: {
        text: text,
        rating: rating,
      },
    });
  }
  async getUserComments(userId: string) {
    return await this.prisma.comments.findMany({
      where: {
        userId
      },
    });
  }

  async getComments(questionId: string) {
    return await this.prisma.comments.findMany({
      where: {
        questionId
      },
      include: {
        user: {
          select: {
            displayName: true,
            email: true,
            id: true,
          }
        }
      }
    });
  }

  async deleteComment(cid: string) {
    return await this.prisma.comments.delete({
      where: {
        id: cid
      }
    });
  }
}
