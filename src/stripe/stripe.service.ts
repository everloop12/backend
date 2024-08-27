import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Stripe } from 'stripe';

// const stripe = new Stripe(process.env.STRIPE_TEST_SECRET_KEY, {
//     apiVersion: '2023-08-16'
// });

@Injectable()
export class StripeService {
    private stripe: Stripe;

    constructor(
        private configService: ConfigService
    ) {
        this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2023-08-16'
        });
    }

    async createCheckoutSession() {
        const priceId = 'price_1NhJt7H5sIq7cMX7XPnZJeek';

        const session = await this.stripe.checkout.sessions.create({
            mode: 'subscription',

            line_items: [
                {
                    price: priceId,
                    // For metered billing, do not pass quantity
                    quantity: 1,
                },
            ],
            // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
            // the actual Session ID is returned in the query parameter when your customer
            // is redirected to the success page.
            success_url: 'https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://example.com/canceled.html',
        });

        return session;
    }

    public async constructEventFromPayload(signature: string, payload: Buffer) {
        const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');

        const event = this.stripe.webhooks.constructEvent(
            payload,
            signature,
            webhookSecret
        );

        let subscription: Stripe.Subscription;
        let status: Stripe.Subscription.Status;

        switch (event.type) {
            case 'customer.subscription.trial_will_end':
                subscription = event.data.object as Stripe.Subscription;
                status = subscription.status;
                console.log(`Subscription status is ${status}.`);
                // Then define and call a method to handle the subscription trial ending.
                // handleSubscriptionTrialEnding(subscription);
                break;
            case 'customer.subscription.deleted':
                subscription = event.data.object as Stripe.Subscription;
                status = subscription.status;
                console.log(`Subscription status is ${status}.`);
                // Then define and call a method to handle the subscription deleted.
                // handleSubscriptionDeleted(subscriptionDeleted);
                break;
            case 'customer.subscription.created':
                subscription = event.data.object as Stripe.Subscription;
                status = subscription.status;
                console.log(`Subscription status is ${status}.`);
                // Then define and call a method to handle the subscription created.
                // handleSubscriptionCreated(subscription);
                break;
            case 'customer.subscription.updated':
                subscription = event.data.object as Stripe.Subscription;
                status = subscription.status;
                console.log(`Subscription status is ${status}.`);
                // Then define and call a method to handle the subscription update.
                // handleSubscriptionUpdated(subscription);
                break;
            default:
                // Unexpected event type
                console.log(`Unhandled event type ${event.type}.`);
        }

        return 'ok';
    }
}
