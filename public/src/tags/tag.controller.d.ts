import { TagService } from './tag.service';
import { MultTagDto, TagDto } from './dto/tag.dto';
export declare class TagController {
    private readonly tagService;
    constructor(tagService: TagService);
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
    getQuestionsByTags(userId: string): Promise<{
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
    deleteTag(id: string, dto: MultTagDto): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
