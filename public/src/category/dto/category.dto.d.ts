export declare class CategoryDto {
    name: string;
}
export declare class MultCategoryDto {
    ids: string[];
}
export declare class ExamPrepDto {
    tags: string[];
    categories: string[];
    uid: string;
    revision: boolean;
    history: boolean;
    pageNumber: number;
}
