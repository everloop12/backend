import { QuestTypeEnum, QuestFrequencyEnum } from '@prisma/client';
import { IsEnum, IsNumber, IsString, } from 'class-validator';



export class QuestDTO {
    @IsString()
    uid: string;

    @IsEnum(QuestTypeEnum)
    tag: QuestTypeEnum;

    @IsNumber()
    currentProgress: number;

    @IsNumber()
    goal: number;

    @IsNumber()
    reward: number;

}

export class QuestDTOExtended {
    @IsString()
    uid: string;

    @IsEnum(QuestTypeEnum)
    tag: QuestTypeEnum;

    @IsNumber()
    currentProgress: number;

    @IsNumber()
    goal: number;

    @IsNumber()
    rotation: number;

    @IsNumber()
    reward: number;

}

export class ProgressQuestDTO {
    @IsString()
    userID: string;

    @IsEnum(QuestTypeEnum)
    tag: QuestTypeEnum;
}
