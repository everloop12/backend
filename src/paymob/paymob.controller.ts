import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PaymobService } from './paymob.service';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';
import { GetUser } from 'src/common/decorator/get-user.decorator';

@Controller('paymob')
export class PaymobController {
  constructor(private readonly paymobService: PaymobService) { }

  @Get('auth-token')
  async getAuthToken() {
    return this.paymobService.getAuthToken();
  }

  @UseGuards(FirebaseAuthGuard)
  @Post('invoice')
  async createInvoice(@GetUser('email') userEmail: string) {
    // userEmail = 'mo@test.com';
    return this.paymobService.createInvoice(userEmail);
  }

  // @Post('payment-key')
  // async createPaymentKey() {
  //   return this.paymobService.createPaymentKey();
  // }

  @Post('webhook')
  async webhook(@Body() body: any, @Query('hmac') hmac: string) {
    return this.paymobService.webhook(body, hmac);
  }
}
