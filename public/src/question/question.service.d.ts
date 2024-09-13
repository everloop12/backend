import { PrismaService } from '../prisma/prisma.service';
import { AddQuestionDto, SearchQDTO, UpdateQuestionDTO } from './dto/add_question.dto';
import { QuestSevice } from 'src/quests/quest.service';
import { PaginationQueryDto } from '../prisma/paginator';
export declare class QuestionService {
    readonly prisma: PrismaService;
    private questService;
    constructor(prisma: PrismaService, questService: QuestSevice);
    getQuestionById(id: string): Promise<{
        categories: (import("@prisma/client/runtime").GetResult<{
            id: string;
            name: string;
            questionIDs: string[];
            averageRating: number;
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
    }>;
    getQuestionsByCategory(categoryId: string): Promise<{
        choices: {
            text: string;
        }[];
    }[]>;
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
    deleteQuestions(ids: string[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
    deleteAll(): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getQuestionsByMultCategory(paginationDto: PaginationQueryDto, uid: string, categories: string[], tags: string[], revision?: boolean, history?: boolean, pageNumber?: number): Promise<{
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
    getSaidQuestion(id: string): Promise<({
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
    getQuestions(search: SearchQDTO, pagen: number): Promise<({
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
    initQuests(): Promise<void>;
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
    private shuffleArray;
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
}
