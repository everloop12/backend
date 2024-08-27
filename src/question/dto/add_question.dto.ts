import {
  IsArray,
  ArrayMaxSize,
  ArrayMinSize,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  isArray,
} from 'class-validator';

export class AddQuestionDto {

  @IsString()
  question: string;

  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(5)
  choices: QuestionChoiceDto[];

  @IsArray()
  @IsOptional()
  references: string[];

  // @IsArray()
  // @IsOptional()
  // tags: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  categoryIds: string[] = [];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tagIds: string[] = [];
}


export class UpdateQuestionDTO {

  @IsString()
  id: string

  @IsString()
  question?: string;

  @IsArray()
  @ArrayMinSize(4)
  @ArrayMaxSize(5)
  choices: QuestionChoiceDto[];

  @IsArray()
  @IsOptional()
  references?: string[];

  // @IsArray()
  // @IsOptional()
  // tags?: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  categoryIds?: string[]

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tagIds?: string[]
}
export class SearchQDTO {
  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  categories?: string;

  @IsOptional()
  tags?: string;
}

export class DeleteQuestionQueryDTO {
  @IsString({ each: true })
  ids: string[]
}

class QuestionChoiceDto {
  @IsString()
  text: string;

  @IsBoolean()
  isCorrect: boolean;

  @IsNumber()
  index: number;
}
