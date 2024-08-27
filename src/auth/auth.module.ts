import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FirebaseAuthStrategy } from './strategies/firebase.strategy';
import { Global } from '@nestjs/common/decorators';
import { QuestSevice } from 'src/quests/quest.service';

@Global()
@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthStrategy, QuestSevice],
  exports: [AuthService],
})
export class AuthModule { }
