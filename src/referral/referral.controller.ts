import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ReferralService } from './referral.service';
import { GetUser } from '../common/decorator/get-user.decorator';
import { AcceptReferralDto, MileStoneDto } from './dto/accept_referral.dto';
import { FirebaseAuthGuard } from '../auth/guards/firebase-auth.guard';

@Controller('referral')
export class ReferralController {
  constructor(private readonly referralService: ReferralService) { }

  @Post('accept')
  @UseGuards(FirebaseAuthGuard)
  async acceptReferral(
    @Body() body: AcceptReferralDto,
    @GetUser('uid') userId: string) {
    return this.referralService.acceptReferral(body.referralCode, userId);
  }

  @Get('count')
  @UseGuards(FirebaseAuthGuard)
  async getUserReferrals(
    @GetUser('uid') userId: string) {
    return this.referralService.getUserReferrals(userId);
  }

  @Get('claims')
  @UseGuards(FirebaseAuthGuard)
  async getUserClaims(
    @GetUser('uid') userId: string) {
    return this.referralService.getUserClaims(userId);
  }

  @Post('claim')
  @UseGuards(FirebaseAuthGuard)
  async claimUserReward(
    @Body() body: MileStoneDto,
    @GetUser('uid') userId: string) {
    return this.referralService.claimUserReward(userId, body.mileStone);
  }

}
