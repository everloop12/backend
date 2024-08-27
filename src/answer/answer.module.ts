import { Module } from '@nestjs/common';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { QuestSevice } from 'src/quests/quest.service';


@Module({
  controllers: [AnswerController],
  providers: [AnswerService, QuestSevice],
})
export class AnswerModule { }
