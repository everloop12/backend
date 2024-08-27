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
import { StatsSevice } from "./stats.service";
import { GetUser } from "src/common/decorator/get-user.decorator";
import { Cron, CronExpression } from "@nestjs/schedule";

@Controller("stats")
export class StatsContoller {
  constructor(private readonly statsService: StatsSevice) { }


  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async handleStatsResetCron() {
    return this.statsService.calculateStats();
  }

  @Get()
  @UseGuards(FirebaseAuthGuard)
  async deleteTag() {
    return await this.statsService.getStats();
  }

}
