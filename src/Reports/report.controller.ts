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
import { ReportSevice } from "./report.service";
import { ReportDTO } from "./dto/report.dto";
import { GetUser } from "src/common/decorator/get-user.decorator";
import { Cron, CronExpression } from "@nestjs/schedule";

@Controller("reports")
export class ReportContoller {
  constructor(private readonly reportService: ReportSevice) { }

  @Patch(':qid')
  @UseGuards(FirebaseAuthGuard)
  editReport(@Param('qid') qid: string, @Body() dto: { reason: string }) {
    return this.reportService.editReport(qid, dto.reason);
  }

  @Get('user/:uid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getUserReports(@Param('uid') uid: string) {
    return this.reportService.getUserReports(uid);
  }

  @Get(':qid')
  @UseGuards(FirebaseAuthGuard)
  getReports(@Param('qid') qid: string, @GetUser('uid') uid: string,) {
    return this.reportService.getReports(qid, uid);
  }

  @Post(':qid')
  @UseGuards(FirebaseAuthGuard)
  addReport(@GetUser('uid') uid: string, @Param('qid') qid: string, @Body() dto: { reason: string }) {
    return this.reportService.addReport(uid, qid, dto.reason);
  }

  @Delete(':qid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  clearReports(@Param('qid') qid: string) {
    return this.reportService.clearReports(qid);
  }
  
}
