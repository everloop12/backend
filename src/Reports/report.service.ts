import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { ReportDTO } from "./dto/report.dto";

@Injectable()
export class ReportSevice {
  constructor(readonly prisma: PrismaService) { }

  async addReport(uid: string, qid: string, reason: string) {
    return await this.prisma.reports.create({
      data: {
        userId: uid,
        questionId: qid,
        reason: reason,
      },
    });
  }

  async editReport(qid: string, reason: string) {
    return await this.prisma.reports.update({
      where: {
        id: qid
      },
      data: {
        reason: reason,
      },
    });
  }

  async clearReports(qid: string) {
    return await this.prisma.reports.deleteMany({
      where: {
        id: qid
      }
    });
  }

  async getUserReports(userId: string) {
    return await this.prisma.reports.findMany({
      where: {
        userId
      },
    });
  }

  async getReports(questionId: string, uid: string) {
    return await this.prisma.reports.findMany({
      where: {
        questionId,
        userId: uid
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

  async deleteReport(cid: string) {
    return await this.prisma.reports.delete({
      where: {
        id: cid
      }
    });
  }


}
