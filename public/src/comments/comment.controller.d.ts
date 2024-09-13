import { CommentSevice } from "./comment.service";
export declare class CommentContoller {
    private readonly commentService;
    constructor(commentService: CommentSevice);
    deleteComment(cid: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    editComment(qid: string, dto: {
        text: string;
        rating: number;
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
    getUserComments(uid: string): Promise<(import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {})[]>;
    getQuestionComments(qid: string): Promise<({
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
    addComment(uid: string, qid: string, dto: {
        text: string;
        rating: number;
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: string;
        userId: string;
        questionId: string;
        text: string;
        rating: number;
        createdAt: Date;
        updatedAt: Date;
    }, unknown> & {}>;
}
