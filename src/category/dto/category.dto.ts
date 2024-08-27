import { IsArray, IsBoolean, IsNumber, IsString } from 'class-validator';

export class CategoryDto {
  @IsString()
  name: string;
}


export class MultCategoryDto {
  @IsArray()
  ids: string[];
}

export class ExamPrepDto {
  @IsArray()
  tags: string[];

  @IsArray()
  categories: string[];

  @IsString()
  uid: string;

  @IsBoolean()
  revision: boolean;

  @IsBoolean()
  history: boolean;

  @IsNumber()
  pageNumber: number;
}