import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { CategoryDto, MultCategoryDto } from './dto/category.dto';
import { GetUser } from 'src/common/decorator/get-user.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Get()
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Get('/userData')
  @UseGuards(FirebaseAuthGuard)
  async getQuestionsByCategories(@GetUser('uid') userId: string) {
    return await this.categoryService.getAnswersByCategories(userId);
  }
  
  @Get('/userAnalytics')
  @UseGuards(FirebaseAuthGuard)
  async getUserAnalytics(@GetUser('uid') userId: string) {
    return await this.categoryService.getUserAnalytics(userId);
  }

  @Post()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async addCategory(@Body() dto: CategoryDto) {
    return await this.categoryService.addCategory(dto);
  }

  @Patch(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateCategory(@Param('id') id: string, @Body() dto: CategoryDto) {
    return await this.categoryService.updateCategory(id, dto);
  }

  @Delete('')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteCategory(@Param('id') id: string, @Body() dto: MultCategoryDto) {
    return await this.categoryService.deleteCategories(id, dto.ids);
  }



}
