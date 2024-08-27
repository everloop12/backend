import { IsArray, IsString } from 'class-validator';

export class TagDto {
  @IsString()
  name: string;
}


export class MultTagDto {
  @IsArray()
  ids: string[];
}