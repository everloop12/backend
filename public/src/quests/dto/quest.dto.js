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
exports.ProgressQuestDTO = exports.QuestDTOExtended = exports.QuestDTO = void 0;
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class QuestDTO {
}
exports.QuestDTO = QuestDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestDTO.prototype, "uid", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.QuestTypeEnum),
    __metadata("design:type", String)
], QuestDTO.prototype, "tag", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestDTO.prototype, "currentProgress", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestDTO.prototype, "goal", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestDTO.prototype, "reward", void 0);
class QuestDTOExtended {
}
exports.QuestDTOExtended = QuestDTOExtended;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], QuestDTOExtended.prototype, "uid", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.QuestTypeEnum),
    __metadata("design:type", String)
], QuestDTOExtended.prototype, "tag", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestDTOExtended.prototype, "currentProgress", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestDTOExtended.prototype, "goal", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestDTOExtended.prototype, "rotation", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], QuestDTOExtended.prototype, "reward", void 0);
class ProgressQuestDTO {
}
exports.ProgressQuestDTO = ProgressQuestDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProgressQuestDTO.prototype, "userID", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.QuestTypeEnum),
    __metadata("design:type", String)
], ProgressQuestDTO.prototype, "tag", void 0);
//# sourceMappingURL=quest.dto.js.map