import { CategoryService } from './category.service';
import { CategoryDto, MultCategoryDto } from './dto/category.dto';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
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
    getQuestionsByCategories(userId: string): Promise<{
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
    getUserAnalytics(userId: string): Promise<({
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
    deleteCategory(id: string, dto: MultCategoryDto): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
