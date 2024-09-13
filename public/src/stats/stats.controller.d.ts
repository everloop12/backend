import { StatsSevice } from "./stats.service";
export declare class StatsContoller {
    private readonly statsService;
    constructor(statsService: StatsSevice);
    handleStatsResetCron(): Promise<void>;
    deleteTag(): Promise<(import("@prisma/client/runtime").GetResult<{
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
}
