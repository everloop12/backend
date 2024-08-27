import { Module } from '@nestjs/common';
import { CommentSevice } from './comment.service';
import { CommentContoller } from './comment.controller';


@Module({
  controllers: [CommentContoller],
  providers: [CommentSevice]
})
export class CommentModule { }
