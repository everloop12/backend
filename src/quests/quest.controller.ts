import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { FirebaseAuthGuard } from "../auth/guards/firebase-auth.guard";
import { Roles } from "../common/decorator/roles.decorator";
import { RolesGuard } from "../common/guards/role.guard";
import { QuestSevice } from "./quest.service";
import { QuestDTO } from "./dto/quest.dto";
import { QuestTypeEnum } from "@prisma/client";
import { GetUser } from "src/common/decorator/get-user.decorator";
import { Cron, CronExpression } from "@nestjs/schedule";

@Controller("quest")
export class QuestContoller {
  constructor(private readonly questService: QuestSevice) { }

  // controller is for testing only

  @Get()
  getallQuests() {
    return this.questService.getQuests();
  }

  @Get('/badges')
  @UseGuards(FirebaseAuthGuard)
  getUserStuff(@GetUser('uid') userId: string) {
    return this.questService.getUserBadges(userId)
  }

  @Get('badges/:uid')
  @UseGuards(FirebaseAuthGuard)
  getOtherUserStuff(@Param('id') uid: string) {
    return this.questService.getUserBadges(uid)

  }

  @Get(":uid")
  // getUserQuests(@GetUser('uid') userId: string) {
  //   return this.questService.getUserQuests(userId);
  // }
  getUserQuests(@Param("uid") userId: string) {
    return this.questService.getUserQuests(userId);
  }

  @Post()
  addQuestion(@Body() dto: QuestDTO) {
    return this.questService.addQuest(dto);
  }

  @Post("prog")
  progress(@Body() dto: { tag: QuestTypeEnum; uid: string }) {
    return this.questService.progressQuests(dto.tag, dto.uid);
  }

  // @Post("reset")
  // reset() {
  //   return this.questService.resetQuests();
  // }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleQuestResetCron() {
    return this.questService.resetQuests();
  }

  // @Post("random")
  // resetRandom(@Body() dto: { tag: QuestTypeEnum, uid: string }) {
  //   return this.questService.progressQuests(dto.tag, dto.uid);
  // }

  @Post("login")
  progressLogin(@Body() dto: { uid: string }) {
    return this.questService.progressLogin(dto.uid);
  }

  @Delete()
  deleteAll() {
    return this.questService.deleteQuests();
  }
}
