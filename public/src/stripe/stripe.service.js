"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const stripe_1 = require("stripe");
let StripeService = exports.StripeService = class StripeService {
    constructor(configService) {
        this.configService = configService;
        this.stripe = new stripe_1.Stripe(configService.get('STRIPE_SECRET_KEY'), {
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
                    quantity: 1,
                },
            ],
            success_url: 'https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'https://example.com/canceled.html',
        });
        return session;
    }
    async constructEventFromPayload(signature, payload) {
        const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
        const event = this.stripe.webhooks.constructEvent(payload, signature, webhookSecret);
        let subscription;
        let status;
        switch (event.type) {
            case 'customer.subscription.trial_will_end':
                subscription = event.data.object;
                status = subscription.status;
                console.log(`Subscription status is ${status}.`);
                break;
            case 'customer.subscription.deleted':
                subscription = event.data.object;
                status = subscription.status;
                console.log(`Subscription status is ${status}.`);
                break;
            case 'customer.subscription.created':
                subscription = event.data.object;
                status = subscription.status;
                console.log(`Subscription status is ${status}.`);
                break;
            case 'customer.subscription.updated':
                subscription = event.data.object;
                status = subscription.status;
                console.log(`Subscription status is ${status}.`);
                break;
            default:
                console.log(`Unhandled event type ${event.type}.`);
        }
        return 'ok';
    }
};
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StripeService);
//# sourceMappingURL=stripe.service.js.map