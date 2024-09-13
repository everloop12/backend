import { PrismaService } from "../prisma/prisma.service";
export declare class CommentSevice {
    readonly prisma: PrismaService;
    constructor(prisma: PrismaService);
    addComment(uid: string, qid: string, text: string, rating: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    editComment(qid: string, text: string, rating: number): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    getUserComments(userId: string): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    getComments(questionId: string): Promise<({
        user: {
            displayName: string;
            email: string;
            id: string;
        };
    } & import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    deleteComment(cid: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
}
