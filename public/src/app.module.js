"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_logger_middleware_1 = require("./common/middlewares/app-logger-middleware");
const user_module_1 = require("./user/user.module");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const transform_response_interceptor_1 = require("./common/interceptors/transform-response.interceptor");
const core_1 = require("@nestjs/core");
const configuration_module_1 = require("./config/configuration.module");
const question_module_1 = require("./question/question.module");
const category_module_1 = require("./category/category.module");
const answer_module_1 = require("./answer/answer.module");
const stripe_module_1 = require("./stripe/stripe.module");
const quest_module_1 = require("./quests/quest.module");
const tag_module_1 = require("./tags/tag.module");
const schedule_1 = require("@nestjs/schedule");
const referral_module_1 = require("./referral/referral.module");
const paymob_module_1 = require("./paymob/paymob.module");
const paypal_module_1 = require("./paypal/paypal.module");
const comment_module_1 = require("./comments/comment.module");
const report_module_1 = require("./Reports/report.module");
const stats_module_1 = require("./stats/stats.module");
let AppModule = exports.AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(app_logger_middleware_1.AppLoggerMiddleware).forRoutes("*");
    }
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            configuration_module_1.ConfigurationModule,
            question_module_1.QuestionModule,
            quest_module_1.QuestModule,
            answer_module_1.AnswerModule,
            category_module_1.CategoryModule,
            stripe_module_1.StripeModule,
            tag_module_1.TagModule,
            referral_module_1.ReferralModule,
            schedule_1.ScheduleModule.forRoot(),
            paymob_module_1.PaymobModule,
            paypal_module_1.PaypalModule,
            comment_module_1.CommentModule,
            report_module_1.ReportModule,
            stats_module_1.StatsModule
        ],
        providers: [
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: transform_response_interceptor_1.TransformResponseInterceptor,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_1.ClassSerializerInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map