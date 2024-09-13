import { QuestionService } from './question.service';
import { AddQuestionDto, DeleteQuestionQueryDTO, SearchQDTO, UpdateQuestionDTO } from './dto/add_question.dto';
import { ExamPrepDto } from 'src/category/dto/category.dto';
import { PaginationQueryDto } from '../prisma/paginator';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    getAllQuestions(search: SearchQDTO, page: number): Promise<({
        _count: {
            Comments: number;
            Reports: number;
        };
        Comments: (import("@prisma/client/runtime").GetResult<{
            id: string;
            userId: string;
            questionId: string;
            text: string;
            rating: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
        Reports: (import("@prisma/client/runtime").GetResult<{
            id: string;
            userId: string;
            questionId: string;
            reason: string;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
        categories: (import("@prisma/client/runtime").GetResult<{
            id: string;
            name: string;
            questionIDs: string[];
            averageRating: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
        tags: (import("@prisma/client/runtime").GetResult<{
            id: string;
            name: string;
            questionIDs: string[];
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        question: string;
        createdAt: Date;
        updatedAt: Date;
        tagIds: string[];
        references: string[];
        categoryIds: string[];
    }, unknown> & {
        choices: ({
            text: string;
            isCorrect: boolean;
            index: number;
        } & {})[];
    })[]>;
    initQ(): Promise<void>;
    getUserData(uid: string): Promise<{
        questions: ({
            answers: (import("@prisma/client/runtime").GetResult<{
                id: string;
                userId: string;
                questionId: string;
                answer: import(".prisma/client").AnswerEnum;
                index: number;
                deleted: boolean;
                isCorrect: boolean;
                createdAt: Date;
                updatedAt: Date;
            }, unknown> & {})[];
        } & import("@prisma/client/runtime").GetResult<{
            id: string;
            question: string;
            createdAt: Date;
            updatedAt: Date;
            tagIds: string[];
            references: string[];
            categoryIds: string[];
        }, unknown> & {
            choices: ({
                text: string;
                isCorrect: boolean;
                index: number;
            } & {})[];
        })[];
        tags: (import("@prisma/client/runtime").GetResult<{
            id: string;
            name: string;
            questionIDs: string[];
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
        categories: (import("@prisma/client/runtime").GetResult<{
            id: string;
            name: string;
            questionIDs: string[];
            averageRating: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
        stats: {
            id: string;
            answers: {
                user: {
                    country: string;
                    university: string;
                };
            }[];
        }[];
    }>;
    addQuestion(dto: AddQuestionDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        question: string;
        createdAt: Date;
        updatedAt: Date;
        tagIds: string[];
        references: string[];
        categoryIds: string[];
    }, unknown> & {
        choices: ({
            text: string;
            isCorrect: boolean;
            index: number;
        } & {})[];
    }>;
    updateQuestion(id: string, dto: UpdateQuestionDTO): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        question: string;
        createdAt: Date;
        updatedAt: Date;
        tagIds: string[];
        references: string[];
        categoryIds: string[];
    }, unknown> & {
        choices: ({
            text: string;
            isCorrect: boolean;
            index: number;
        } & {})[];
    }>;
    deleteQuestions(dto: DeleteQuestionQueryDTO): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteAll(): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getSpecificQuestion(id: string): Promise<({
        categories: (import("@prisma/client/runtime").GetResult<{
            id: string;
            name: string;
            questionIDs: string[];
            averageRating: number;
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
        tags: (import("@prisma/client/runtime").GetResult<{
            id: string;
            name: string;
            questionIDs: string[];
            createdAt: Date;
            updatedAt: Date;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        question: string;
        createdAt: Date;
        updatedAt: Date;
        tagIds: string[];
        references: string[];
        categoryIds: string[];
    }, unknown> & {
        choices: ({
            text: string;
            isCorrect: boolean;
            index: number;
        } & {})[];
    }) | {
        status: number;
        success: boolean;
    }>;
    getQuestionsByCategory(uid: string, paginationQuery: PaginationQueryDto, dto: ExamPrepDto): Promise<{
        questions: any;
        stats: {
            id: string;
            answers: {
                user: {
                    country: string;
                    university: string;
                };
            }[];
        }[];
    }>;
}
