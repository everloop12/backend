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
exports.DeleteQuestionQueryDTO = exports.SearchQDTO = exports.UpdateQuestionDTO = exports.AddQuestionDto = void 0;
const class_validator_1 = require("class-validator");
class AddQuestionDto {
    constructor() {
        this.categoryIds = [];
        this.tagIds = [];
    }
}
exports.AddQuestionDto = AddQuestionDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddQuestionDto.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(4),
    (0, class_validator_1.ArrayMaxSize)(5),
    __metadata("design:type", Array)
], AddQuestionDto.prototype, "choices", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AddQuestionDto.prototype, "references", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AddQuestionDto.prototype, "categoryIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], AddQuestionDto.prototype, "tagIds", void 0);
class UpdateQuestionDTO {
}
exports.UpdateQuestionDTO = UpdateQuestionDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuestionDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateQuestionDTO.prototype, "question", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(4),
    (0, class_validator_1.ArrayMaxSize)(5),
    __metadata("design:type", Array)
], UpdateQuestionDTO.prototype, "choices", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateQuestionDTO.prototype, "references", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateQuestionDTO.prototype, "categoryIds", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateQuestionDTO.prototype, "tagIds", void 0);
class SearchQDTO {
}
exports.SearchQDTO = SearchQDTO;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchQDTO.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchQDTO.prototype, "categories", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SearchQDTO.prototype, "tags", void 0);
class DeleteQuestionQueryDTO {
}
exports.DeleteQuestionQueryDTO = DeleteQuestionQueryDTO;
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], DeleteQuestionQueryDTO.prototype, "ids", void 0);
class QuestionChoiceDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestionChoiceDto.prototype, "text", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], QuestionChoiceDto.prototype, "isCorrect", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestionChoiceDto.prototype, "index", void 0);
//# sourceMappingURL=add_question.dto.js.map