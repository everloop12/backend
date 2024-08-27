import { Body, Controller, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';
import { Delete, Get, Patch } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Role } from '@prisma/client';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { RolesGuard } from '../common/guards/role.guard';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { GetUser } from '../common/decorator/get-user.decorator';
import { QuestSevice } from 'src/quests/quest.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly qusetService: QuestSevice) { }

  @Get('profile')
  @UseGuards(FirebaseAuthGuard)
  getUserInfo(@GetUser('uid') userId: string) {
    this.qusetService.progressLogin(userId);
    return this.userService.getInfo(userId);
  }

  @Patch('settings')
  @UseGuards(FirebaseAuthGuard)
  adjustProfileSettings(@GetUser('uid') userId: string, @Body() dto: { data: { focus: boolean, anon: boolean } }) {
    return this.userService.changeSettings(userId, dto);
  }

  @Delete('me')
  @UseGuards(FirebaseAuthGuard)
  deleteUser(@GetUser('uid') userId: string) {
    return this.userService.deleteUser(userId);
  }


  @Get('analytics')
  @UseGuards(FirebaseAuthGuard)
  getAnalytics(@GetUser('uid') userId: string) {
    return this.userService.getAnalytics(userId);
  }

  @Get('streak')
  @UseGuards(FirebaseAuthGuard)
  getStreak(@GetUser('uid') userId: string) {
    return this.userService.getStreak(userId)
  }


  @Get('subscriptionStatus')
  @UseGuards(FirebaseAuthGuard)
  getSubscriptionStatus(@GetUser('uid') userId: string) {
    return this.userService.getSubscriptionStatus(userId);
  }

  @Get('history/:page')
  @UseGuards(FirebaseAuthGuard)
  getHistory(@GetUser('uid') userId: string, @Param('page') page: number) {
    return this.userService.getHistory(userId, page ?? 1);
  }

  @Get('answers')
  @UseGuards(FirebaseAuthGuard)
  async getUserAnswers(@GetUser('uid') userId: string) {
    return await this.userService.getUserAnswers(userId);
  }

  @Get('list')
  @UseGuards(FirebaseAuthGuard)
  getUserList() {
    return this.userService.getUserList();
  }

  @Get('leaderBoard/:page')
  @UseGuards(FirebaseAuthGuard)
  getAllUsers(@Param('page') page: number) {
    console.log('page: ', page)
    return this.userService.getAll(page);
  }

  @Get(':uid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  getUserInfoAdmin(@Param('uid') userId: string) {
    return this.userService.getInfo(userId);
  }

  @Get('info/:uid')
  @UseGuards(FirebaseAuthGuard)
  getOtherUserInfo(@Param('uid') userId: string) {
    return this.userService.getOtherUserInfo(userId);
  }


  @Get(':uid/xp')
  getUserXp(@Param('uid') userId: string) {
    return this.userService.getXp(userId);
  }
}
