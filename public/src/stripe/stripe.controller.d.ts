import { StripeService } from './stripe.service';
import Stripe from 'stripe';
import { RequestWithRawBody } from '../common/middlewares/rawBody.middleware';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createCheckoutSession(): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    handleIncomingEvents(signature: string, request: RequestWithRawBody): Promise<string>;
}
