import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { RolesGuard } from '../common/guards/role.guard';
import { AddAnswerDto, AddAnswerDtoExtended, DeleteQuestionQueryDTO, ResetQuestionQueryDTO, UpdateAnswerDTO } from './dto/answer.dto';
import { GetUser } from 'src/common/decorator/get-user.decorator';

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) { }

  @Post()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  addAnswer(@Body() dto: AddAnswerDtoExtended) {
    return this.answerService.addAnswer(dto);
  }

  @Patch()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  updateAnswer(@Body() dto: UpdateAnswerDTO) {
    return this.answerService.updateAnswer(dto);
  }

  @Delete()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  deleteAnswers(@Body() dto: DeleteQuestionQueryDTO) {
    return this.answerService.deleteAnswers(dto.ids);
  }

  @Post('reset')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  resetAnswers(@GetUser('uid') userId: string, @Body() dto: ResetQuestionQueryDTO) {
    return this.answerService.resetAnswers(userId, dto.ids);
  }

  @Post('resetT')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  resetAnswersT(@GetUser('uid') userId: string, @Body() dto: ResetQuestionQueryDTO) {
    return this.answerService.resetAnswersByTags(userId, dto.ids);
  }

  @Get()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getAllAnswers() {
    return this.answerService.getAnswers();
  }

}
