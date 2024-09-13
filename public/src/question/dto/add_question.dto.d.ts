export declare class AddQuestionDto {
    question: string;
    choices: QuestionChoiceDto[];
    references: string[];
    categoryIds: string[];
    tagIds: string[];
}
export declare class UpdateQuestionDTO {
    id: string;
    question?: string;
    choices: QuestionChoiceDto[];
    references?: string[];
    categoryIds?: string[];
    tagIds?: string[];
}
export declare class SearchQDTO {
    text?: string;
    categories?: string;
    tags?: string;
}
export declare class DeleteQuestionQueryDTO {
    ids: string[];
}
declare class QuestionChoiceDto {
    text: string;
    isCorrect: boolean;
    index: number;
}
export {};
