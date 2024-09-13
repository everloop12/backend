import { PrismaService } from "../prisma/prisma.service";
export declare class ReportSevice {
    readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    addReport(uid: string, qid: string, reason: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        reason: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    editReport(qid: string, reason: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        reason: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    clearReports(qid: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getUserReports(userId: string): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        reason: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    getReports(questionId: string, uid: string): Promise<({
        user: {
            displayName: string;
            email: string;
            id: string;
        };
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        reason: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    deleteReport(cid: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        reason: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
}
