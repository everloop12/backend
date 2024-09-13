import { PrismaService } from '../prisma/prisma.service';
import { AddAnswerDtoExtended, UpdateAnswerDTO } from './dto/answer.dto';
import { QuestSevice } from 'src/quests/quest.service';
import { UserService } from 'src/user/user.service';
export declare class AnswerService {
    readonly prisma: PrismaService;
    private questService;
    private userService;
    constructor(prisma: PrismaService, questService: QuestSevice, userService: UserService);
    getAnswerById(id: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        answer: import(".prisma/client").AnswerEnum;
        index: number;
        deleted: boolean;
        isCorrect: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    updateAnswer(data: UpdateAnswerDTO): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        answer: import(".prisma/client").AnswerEnum;
        index: number;
        deleted: boolean;
        isCorrect: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    deleteAnswers(ids: string[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteAnswer(id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
    resetAnswers(uid: string, categories: string[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
    resetAnswersByTags(uid: string, tags: string[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getAnswers(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        answer: import(".prisma/client").AnswerEnum;
        index: number;
        deleted: boolean;
        isCorrect: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    addAnswer(dto: AddAnswerDtoExtended): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        answer: import(".prisma/client").AnswerEnum;
        index: number;
        deleted: boolean;
        isCorrect: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
}
