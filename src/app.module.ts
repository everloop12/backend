import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
} from "@nestjs/common";
import { AppLoggerMiddleware } from "./common/middlewares/app-logger-middleware";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { TransformResponseInterceptor } from "./common/interceptors/transform-response.interceptor";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ConfigurationModule } from "./config/configuration.module";
import { QuestionModule } from "./question/question.module";
import { CategoryModule } from "./category/category.module";
import { AnswerModule } from "./answer/answer.module";
import { StripeModule } from "./stripe/stripe.module";
import { QuestModule } from "./quests/quest.module";
import { TagModule } from "./tags/tag.module";
import { ScheduleModule } from "@nestjs/schedule";
import { ReferralModule } from './referral/referral.module';
import { PaymobModule } from './paymob/paymob.module';
import { PaypalModule } from './paypal/paypal.module';
import { CommentModule } from "./comments/comment.module";
import { ReportModule } from "./Reports/report.module";
import { StatsModule } from "./stats/stats.module";

@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    ConfigurationModule,
    QuestionModule,
    QuestModule,
    AnswerModule,
    CategoryModule,
    StripeModule,
    TagModule,
    ReferralModule,
    ScheduleModule.forRoot(),
    PaymobModule,
    PaypalModule,
    CommentModule,
    ReportModule,
    StatsModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes("*");
  }
}
