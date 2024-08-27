import { IsString } from "class-validator";

export class ReportDTO {
   
    @IsString()
    userId: string;
  
    @IsString()
    questionId: string;
  
    @IsString()
    reason: string;
}