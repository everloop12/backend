import { Module } from '@nestjs/common';
import { QuestSevice } from './quest.service';
import { QuestContoller } from './quest.controller';


@Module({
  controllers: [QuestContoller],
  providers: [QuestSevice]
})
export class QuestModule { }
