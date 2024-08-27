import {
  IsEnum,
  IsNumber,
  IsString,
} from 'class-validator';


export class AcceptReferralDto {
  @IsString()
  referralCode: string;
}

export class MileStoneDto {
  @IsNumber()
  mileStone: number;
}