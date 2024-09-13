import { QuestTypeEnum } from '@prisma/client';
export declare class QuestDTO {
    uid: string;
    tag: QuestTypeEnum;
    currentProgress: number;
    goal: number;
    reward: number;
}
export declare class QuestDTOExtended {
    uid: string;
    tag: QuestTypeEnum;
    currentProgress: number;
    goal: number;
    rotation: number;
    reward: number;
}
export declare class ProgressQuestDTO {
    userID: string;
    tag: QuestTypeEnum;
}
