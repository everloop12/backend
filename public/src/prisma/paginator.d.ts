export interface PaginatedResult<T> {
    data: T[];
    meta: {
        total: number;
        lastPage: number;
        currentPage: number;
        perPage: number;
        prev: number | null;
        next: number | null;
    };
}
export type PaginateOptions = {
    page?: number | string;
    perPage?: number | string;
};
export type PaginateFunction = <T, K>(model: any, options?: PaginateOptions, args?: K) => Promise<PaginatedResult<T>>;
export declare const paginator: (defaultOptions: PaginateOptions) => PaginateFunction;
export declare class PaginationQueryDto {
    page?: number;
    perPage?: number;
}
