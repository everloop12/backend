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
import { CommentSevice } from "./comment.service";
import { CommentDTO } from "./dto/comment.dto";
import { GetUser } from "src/common/decorator/get-user.decorator";
import { Cron, CronExpression } from "@nestjs/schedule";

@Controller("comments")
export class CommentContoller {
  constructor(private readonly commentService: CommentSevice) { }

  @Delete(':cid')
  @UseGuards(FirebaseAuthGuard)
  deleteComment(@Param('cid') cid: string) {
    return this.commentService.deleteComment(cid);
  }

  @Patch(':qid')
  @UseGuards(FirebaseAuthGuard)
  editComment(@Param('qid') qid: string, @Body() dto: { text: string, rating: number }) {
    return this.commentService.editComment(qid, dto.text, dto.rating);
  }

  @Get('user/:uid')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getUserComments(@Param('uid') uid: string) {
    return this.commentService.getUserComments(uid);
  }

  @Get(':qid')
  @UseGuards(FirebaseAuthGuard)
  getQuestionComments(@Param('qid') qid: string) {
    return this.commentService.getComments(qid);
  }

  @Post('add/:qid')
  @UseGuards(FirebaseAuthGuard)
  addComment(@GetUser('uid') uid: string, @Param('qid') qid: string, @Body() dto: { text: string, rating: number }) {
    return this.commentService.addComment(uid, qid, dto.text, dto.rating);
  }

}
