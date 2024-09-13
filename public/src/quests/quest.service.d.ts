import { PrismaService } from "../prisma/prisma.service";
import { QuestDTO } from "./dto/quest.dto";
import { QuestTypeEnum } from "@prisma/client";
export declare class QuestSevice {
    readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    getRandomElements: (array: any[], count: number) => any[];
    addQuest(dto: QuestDTO): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        uid: string;
        tag: QuestTypeEnum;
        frequency: import(".prisma/client").QuestFrequencyEnum;
        rotation: number;
        ref: string;
        currentProgress: number;
        goal: number;
        reward: number;
        cleared: boolean;
    }, unknown> & {}>;
    initializeUserQuests(uid: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    updateQuests(): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteUserQuests(uid: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getQuests(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        uid: string;
        tag: QuestTypeEnum;
        frequency: import(".prisma/client").QuestFrequencyEnum;
        rotation: number;
        ref: string;
        currentProgress: number;
        goal: number;
        reward: number;
        cleared: boolean;
    }, unknown> & {})[]>;
    getUserQuests(uid: string): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        uid: string;
        tag: QuestTypeEnum;
        frequency: import(".prisma/client").QuestFrequencyEnum;
        rotation: number;
        ref: string;
        currentProgress: number;
        goal: number;
        reward: number;
        cleared: boolean;
    }, unknown> & {})[]>;
    getUserBadges(uid: string): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        uid: string;
        tag: QuestTypeEnum;
        frequency: import(".prisma/client").QuestFrequencyEnum;
        rotation: number;
        ref: string;
        currentProgress: number;
        goal: number;
        reward: number;
        cleared: boolean;
    }, unknown> & {})[]>;
    deleteQuests(): Promise<import(".prisma/client").Prisma.BatchPayload>;
    resetQuests(): Promise<import(".prisma/client").Prisma.BatchPayload>;
    progressLogin(uid: string): Promise<{
        cleared: boolean;
        id: string;
        tag: QuestTypeEnum;
        uid: string;
        frequency: import(".prisma/client").QuestFrequencyEnum;
        rotation: number;
        ref: string;
        currentProgress: number;
        goal: number;
        reward: number;
    }[]>;
    progressQuests(tag: QuestTypeEnum, uid: string, ref?: string): Promise<{
        cleared: boolean;
        id: string;
        tag: QuestTypeEnum;
        uid: string;
        frequency: import(".prisma/client").QuestFrequencyEnum;
        rotation: number;
        ref: string;
        currentProgress: number;
        goal: number;
        reward: number;
    }[]>;
}
