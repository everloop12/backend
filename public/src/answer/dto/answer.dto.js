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
exports.ResetQuestionQueryDTO = exports.DeleteQuestionQueryDTO = exports.UpdateAnswerDTO = exports.AddAnswerDtoExtended = exports.AddAnswerDto = exports.Answer = void 0;
const class_validator_1 = require("class-validator");
var Answer;
(function (Answer) {
    Answer["A"] = "A";
    Answer["B"] = "B";
    Answer["C"] = "C";
    Answer["D"] = "D";
    Answer["E"] = "E";
})(Answer || (exports.Answer = Answer = {}));
class AddAnswerDto {
}
exports.AddAnswerDto = AddAnswerDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddAnswerDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddAnswerDto.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Answer),
    __metadata("design:type", String)
], AddAnswerDto.prototype, "answer", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AddAnswerDto.prototype, "isCorrect", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddAnswerDto.prototype, "index", void 0);
class AddAnswerDtoExtended {
}
exports.AddAnswerDtoExtended = AddAnswerDtoExtended;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddAnswerDtoExtended.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AddAnswerDtoExtended.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Answer),
    __metadata("design:type", String)
], AddAnswerDtoExtended.prototype, "answer", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], AddAnswerDtoExtended.prototype, "isCorrect", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AddAnswerDtoExtended.prototype, "index", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], AddAnswerDtoExtended.prototype, "categories", void 0);
class UpdateAnswerDTO {
}
exports.UpdateAnswerDTO = UpdateAnswerDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAnswerDTO.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAnswerDTO.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAnswerDTO.prototype, "questionId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(Answer),
    __metadata("design:type", String)
], UpdateAnswerDTO.prototype, "answer", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateAnswerDTO.prototype, "index", void 0);
class DeleteQuestionQueryDTO {
}
exports.DeleteQuestionQueryDTO = DeleteQuestionQueryDTO;
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], DeleteQuestionQueryDTO.prototype, "ids", void 0);
class ResetQuestionQueryDTO {
}
exports.ResetQuestionQueryDTO = ResetQuestionQueryDTO;
__decorate([
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ResetQuestionQueryDTO.prototype, "ids", void 0);
//# sourceMappingURL=answer.dto.js.map