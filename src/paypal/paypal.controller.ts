import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { FirebaseAuthGuard } from 'src/auth/guards/firebase-auth.guard';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) { }

  @Post('orders')
  async createOrder(@GetUser('referredById') referredById: string) {
    return this.paypalService.createOrder(referredById);
  }

  @Post('orders/:id/capture')
  async captureOrder(@Param('id') id: string) {
    return this.paypalService.capturePayment(id);
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('orders/:id/approve')
  async approveOrder(@Param('id') id: string, @GetUser('email') email: string) {
    return this.paypalService.approveOrder(id, email);
  }
}
