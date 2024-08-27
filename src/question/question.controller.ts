import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { RolesGuard } from '../common/guards/role.guard';
import { AddQuestionDto, DeleteQuestionQueryDTO, SearchQDTO, UpdateQuestionDTO } from './dto/add_question.dto';
import { ExamPrepDto } from 'src/category/dto/category.dto';
import { PaginationQueryDto } from '../prisma/paginator';
import { GetUser } from 'src/common/decorator/get-user.decorator';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @Post('page')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getAllQuestions(@Body('search') search: SearchQDTO, @Body('page') page: number) {
    return this.questionService.getQuestions(search, page || 1);
  }

  // @Post('remote_seed')
  // seed() {
  //   return this.questionService.seedFiles();
  // }

  @Post('initQuest')
  initQ() {
    return this.questionService.initQuests();
  }

  @Get('getUserData')
  @UseGuards(FirebaseAuthGuard)
  getUserData(@GetUser('uid') uid: string) {
    return this.questionService.getUserData(uid);
  }

  @Post()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  addQuestion(@Body() dto: AddQuestionDto) {
    return this.questionService.addQuestion(dto);
  }

  @Patch(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  updateQuestion(@Param('id') id: string, @Body() dto: UpdateQuestionDTO) {
    return this.questionService.updateQuestion(id, dto);
  }

  @Delete()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  deleteQuestions(@Body() dto: DeleteQuestionQueryDTO) {
    return this.questionService.deleteQuestions(dto.ids);
  }

  @Delete('all')
  deleteAll() {
    return this.questionService.deleteAll();
  }

  @Get(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getSpecificQuestion(@Param('id') id: string) {
    return this.questionService.getSaidQuestion(id);
  }

  @Post('filteredQuestion')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  getQuestionsByCategory(@GetUser('uid') uid: string, @Query() paginationQuery: PaginationQueryDto, @Body() dto: ExamPrepDto) {
    return this.questionService.getQuestionsByMultCategory(
      paginationQuery,
      uid,
      dto.categories ?? [],
      dto.tags ?? [],
      dto.revision ?? false,
      dto.history ?? false,
      dto.pageNumber ?? 0,
    );
  }
}
