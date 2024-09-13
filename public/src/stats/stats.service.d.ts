import { PrismaService } from "../prisma/prisma.service";
export declare class StatsSevice {
    readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    getStats(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        categoryId: string;
        questionCount: number;
        activeQuestionCount: number;
        performance: number;
        activePerformance: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    calculateStats(): Promise<void>;
}
