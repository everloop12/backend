import { ReportSevice } from "./report.service";
export declare class ReportContoller {
    private readonly reportService;
    constructor(reportService: ReportSevice);
    editReport(qid: string, dto: {
        reason: string;
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        reason: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    getUserReports(uid: string): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        reason: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    getReports(qid: string, uid: string): Promise<({
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
    addReport(uid: string, qid: string, dto: {
        reason: string;
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        reason: string;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    clearReports(qid: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
