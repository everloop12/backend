import {
  IsString,
  IsEnum,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';

export enum Answer {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E"
}

export class AddAnswerDto {

  @IsString()
  userId: string;

  @IsString()
  questionId: string;

  @IsEnum(Answer)
  answer: Answer;

  @IsBoolean()
  isCorrect: boolean;

  @IsNumber()
  index: number;
}

export class AddAnswerDtoExtended {

  @IsString()
  userId: string;

  @IsString()
  questionId: string;

  @IsEnum(Answer)
  answer: Answer;

  @IsBoolean()
  isCorrect: boolean;

  @IsNumber()
  index: number;
  
  @IsArray()
  categories: string[]; 
}


export class UpdateAnswerDTO {

  @IsString()
  id: string

  @IsString()
  userId: string;

  @IsString()
  questionId: string;

  @IsEnum(Answer)
  answer: Answer;

  @IsNumber()
  index: number;
}

export class DeleteQuestionQueryDTO {
  @IsString({ each: true })
  ids: string[]
}


export class ResetQuestionQueryDTO {
  @IsString({ each: true })
  ids: string[]
}

