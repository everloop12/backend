import { HttpService } from "@nestjs/axios";
import { PrismaService } from "src/prisma/prisma.service";
export declare class PaypalService {
    readonly prisma: PrismaService;
    private readonly httpService;
    constructor(prisma: PrismaService, httpService: HttpService);
    generateAccessToken(): Promise<any>;
    createOrder(referredById: string): Promise<any>;
    capturePayment(orderID: string): Promise<any>;
    approveOrder(orderID: string, userEmail: string): Promise<{
        message: string;
    }>;
    handleResponse(response: any): Promise<any>;
}
