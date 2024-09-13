import { AnswerService } from './answer.service';
import { AddAnswerDtoExtended, DeleteQuestionQueryDTO, ResetQuestionQueryDTO, UpdateAnswerDTO } from './dto/answer.dto';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
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
    updateAnswer(dto: UpdateAnswerDTO): Promise<import("@prisma/client/runtime").GetResult<{
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
    deleteAnswers(dto: DeleteQuestionQueryDTO): Promise<import(".prisma/client").Prisma.BatchPayload>;
    resetAnswers(userId: string, dto: ResetQuestionQueryDTO): Promise<import(".prisma/client").Prisma.BatchPayload>;
    resetAnswersT(userId: string, dto: ResetQuestionQueryDTO): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getAllAnswers(): Promise<(import("@prisma/client/runtime").GetResult<{
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
}
