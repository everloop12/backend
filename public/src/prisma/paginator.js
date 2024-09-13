"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginationQueryDto = exports.paginator = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const paginator = (defaultOptions) => {
    return async (model, options, args = { where: undefined }) => {
        const page = Number(options?.page || defaultOptions?.page) || 1;
        const perPage = Number(options?.perPage || defaultOptions?.perPage) || 10;
        const skip = page > 0 ? perPage * (page - 1) : 0;
        const [total, data] = await Promise.all([
            model.count({ where: args.where }),
            model.findMany({
                ...args,
                take: perPage,
                skip,
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
exports.paginator = paginator;
class PaginationQueryDto {
}
exports.PaginationQueryDto = PaginationQueryDto;
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => toNumber(value, { default: 1, min: 1 })),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], PaginationQueryDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Transform)(({ value }) => toNumber(value, { default: 50, min: 1, max: 100 })),
    __metadata("design:type", Number)
], PaginationQueryDto.prototype, "perPage", void 0);
function toNumber(value, opts = {}) {
    let newValue = Number.parseInt(value || String(opts.default), 10);
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
//# sourceMappingURL=paginator.js.map