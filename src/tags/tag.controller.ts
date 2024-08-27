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
import { TagService } from './tag.service';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';
import { RolesGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorator/roles.decorator';
import { MultTagDto, TagDto } from './dto/tag.dto';
import { GetUser } from 'src/common/decorator/get-user.decorator';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) { }

  @Get()
  async getAllTags() {
    return await this.tagService.getAllTags();
  }

  @Get('/userData')
  @UseGuards(FirebaseAuthGuard)
  async getQuestionsByTags(@GetUser('uid') userId: string) {
    return await this.tagService.getAnswersByTags(userId);
  }

  @Post()
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async addTag(@Body() dto: TagDto) {
    return await this.tagService.addTag(dto);
  }

  @Patch(':id')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updateTag(@Param('id') id: string, @Body() dto: TagDto) {
    return await this.tagService.updateTag(id, dto);
  }

  @Delete('')
  @UseGuards(FirebaseAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deleteTag(@Param('id') id: string, @Body() dto: MultTagDto) {
    return await this.tagService.deleteTags(id, dto.ids);
  }
}
