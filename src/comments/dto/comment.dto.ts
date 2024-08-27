import { IsString } from "class-validator";

export class CommentDTO {
   
    @IsString()
    userId: string;
  
    @IsString()
    questionId: string;
  
    @IsString()
    text: string;
}