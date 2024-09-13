import { QuestSevice } from "./quest.service";
import { QuestDTO } from "./dto/quest.dto";
import { QuestTypeEnum } from "@prisma/client";
export declare class QuestContoller {
    private readonly questService;
    constructor(questService: QuestSevice);
    getallQuests(): Promise<(import("@prisma/client/runtime").GetResult<{
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
    getUserStuff(userId: string): Promise<(import("@prisma/client/runtime").GetResult<{
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
    getOtherUserStuff(uid: string): Promise<(import("@prisma/client/runtime").GetResult<{
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
    getUserQuests(userId: string): Promise<(import("@prisma/client/runtime").GetResult<{
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
    addQuestion(dto: QuestDTO): Promise<import("@prisma/client/runtime").GetResult<{
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
    progress(dto: {
        tag: QuestTypeEnum;
        uid: string;
    }): Promise<{
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
    handleQuestResetCron(): Promise<import(".prisma/client").Prisma.BatchPayload>;
    progressLogin(dto: {
        uid: string;
    }): Promise<{
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
    deleteAll(): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
