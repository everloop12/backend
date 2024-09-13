import { PrismaService } from '../prisma/prisma.service';
import { TagDto } from './dto/tag.dto';
export declare class TagService {
    readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    addTag(dto: TagDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        questionIDs: string[];
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    updateTag(id: string, dto: TagDto): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        questionIDs: string[];
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    deleteTags(id: string, tags: string[]): Promise<import(".prisma/client").Prisma.BatchPayload>;
    getAllTags(): Promise<({
        _count: {
            questions: number;
        };
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        name: string;
        questionIDs: string[];
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    getAnswersByTags(uid: string): Promise<{
        id: string;
        name: string;
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
}
