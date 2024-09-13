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
exports.StatsContoller = void 0;
const common_1 = require("@nestjs/common");
const firebase_auth_guard_1 = require("../auth/guards/firebase-auth.guard");
const stats_service_1 = require("./stats.service");
const schedule_1 = require("@nestjs/schedule");
let StatsContoller = exports.StatsContoller = class StatsContoller {
    constructor(statsService) {
        this.statsService = statsService;
    }
    async handleStatsResetCron() {
        return this.statsService.calculateStats();
    }
    async deleteTag() {
        return await this.statsService.getStats();
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_2AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsContoller.prototype, "handleStatsResetCron", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(firebase_auth_guard_1.FirebaseAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsContoller.prototype, "deleteTag", null);
exports.StatsContoller = StatsContoller = __decorate([
    (0, common_1.Controller)("stats"),
    __metadata("design:paramtypes", [stats_service_1.StatsSevice])
], StatsContoller);
//# sourceMappingURL=stats.controller.js.map