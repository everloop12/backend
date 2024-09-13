/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';
export declare class StripeService {
    private configService;
    private stripe;
    constructor(configService: ConfigService);
    createCheckoutSession(): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    constructEventFromPayload(signature: string, payload: Buffer): Promise<string>;
}
