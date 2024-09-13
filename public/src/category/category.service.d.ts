import { PrismaService } from '../prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';
export declare class CategoryService {
    readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    addCategory(dto: CategoryDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        questionIDs: string[];
        averageRating: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    updateCategory(id: string, dto: CategoryDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        questionIDs: string[];
        averageRating: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    deleteCategories(id: string, categories: string[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getAllCategories(): Promise<({
        _count: {
            questions: number;
        };
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        questionIDs: string[];
        averageRating: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    getAnswersByCategories(uid: string): Promise<{
        id: string;
        name: string;
        averageRating: number;
        questions: {
            id: string;
            answers: {
                isCorrect: boolean;
            }[];
        }[];
        _count: {
            questions: number;
        };
    }[]>;
    getUserAnalytics(uid: string): Promise<({
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
        _count: {
            questions: number;
        };
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        questionIDs: string[];
        averageRating: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
}
