import { BadRequestException, Controller, Get, Post, Req, Headers } from '@nestjs/common';
import { StripeService } from './stripe.service';
import Stripe from 'stripe';
import { RequestWithRawBody } from '../common/middlewares/rawBody.middleware';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) { }

  @Get()
  createCheckoutSession() {
    return this.stripeService.createCheckoutSession();
  }

  @Post('webhook')
  async handleIncomingEvents(
    @Headers('stripe-signature') signature: string,
    @Req() request: RequestWithRawBody
  ) {
    if (!signature) {
      throw new BadRequestException('Missing stripe-signature header');
    }

    return this.stripeService.constructEventFromPayload(signature, request.rawBody);
  }
}
