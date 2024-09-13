import { PaypalService } from './paypal.service';
export declare class PaypalController {
    private readonly paypalService;
    constructor(paypalService: PaypalService);
    createOrder(referredById: string): Promise<any>;
    captureOrder(id: string): Promise<any>;
    approveOrder(id: string, email: string): Promise<{
        message: string;
    }>;
}
