import { Module, Global } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { QuestSevice } from 'src/quests/quest.service';

@Global()
@Module({
  controllers: [UserController],
  providers: [UserService, QuestSevice],
  exports: [UserService],
})
export class UserModule { }
