import { PaymobService } from './paymob.service';
export declare class PaymobController {
    private readonly paymobService;
    constructor(paymobService: PaymobService);
    getAuthToken(): Promise<string>;
    createInvoice(userEmail: string): Promise<{
        id: any;
        url: any;
    }>;
    webhook(body: any, hmac: string): Promise<{
        statusCode: number;
    }>;
}
