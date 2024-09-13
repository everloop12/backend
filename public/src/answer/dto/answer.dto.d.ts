export declare enum Answer {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E"
}
export declare class AddAnswerDto {
    userId: string;
    questionId: string;
    answer: Answer;
    isCorrect: boolean;
    index: number;
}
export declare class AddAnswerDtoExtended {
    userId: string;
    questionId: string;
    answer: Answer;
    isCorrect: boolean;
    index: number;
    categories: string[];
}
export declare class UpdateAnswerDTO {
    id: string;
    userId: string;
    questionId: string;
    answer: Answer;
    index: number;
}
export declare class DeleteQuestionQueryDTO {
    ids: string[];
}
export declare class ResetQuestionQueryDTO {
    ids: string[];
}
