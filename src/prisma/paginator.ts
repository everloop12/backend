import { Transform } from "class-transformer";
import { IsNumber, IsOptional } from "class-validator";

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

export type PaginateFunction = <T, K>(
    model: any,
    options?: PaginateOptions,
    args?: K
) => Promise<PaginatedResult<T>>;

export const paginator = (defaultOptions: PaginateOptions): PaginateFunction => {
    return async (model, options, args: any = { where: undefined }) => {
        const page = Number(options?.page || defaultOptions?.page) || 1;
        const perPage = Number(options?.perPage || defaultOptions?.perPage) || 10;

        const skip = page > 0 ? perPage * (page - 1) : 0;

        // Using 'count' for total rows and fetching data in parallel
        const [total, data] = await Promise.all([
            model.count({ where: args.where }),
            model.findMany({
                ...args,
                take: perPage,
                skip,
                // Avoid fetching unnecessary fields, this can be adjusted as needed
                select: args.select || undefined,
            }),
        ]);

        const lastPage = Math.ceil(total / perPage);

        return {
            data,
            meta: {
                total,
                lastPage,
                currentPage: page,
                perPage,
                prev: page > 1 ? page - 1 : null,
                next: page < lastPage ? page + 1 : null,
            },
        };
    };
};

export class PaginationQueryDto {
    @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
    @IsNumber()
    @IsOptional()
    public page?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => toNumber(value, { default: 50, min: 1, max: 100 }))
    public perPage?: number;
}

interface ToNumberOptions {
    default?: number;
    min?: number;
    max?: number;
}

function toNumber(value: string, opts: ToNumberOptions = {}): number {
    let newValue: number = Number.parseInt(value || String(opts.default), 10);

    if (Number.isNaN(newValue)) {
        newValue = opts.default;
    }

    if (opts.min && newValue < opts.min) {
        newValue = opts.min;
    }

    if (opts.max && newValue > opts.max) {
        newValue = opts.max;
    }

    return newValue;
}
