import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { QuestSevice } from 'src/quests/quest.service';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService, QuestSevice],
})
export class QuestionModule { }
