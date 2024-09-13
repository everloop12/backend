import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";
export declare class PaymobService {
    readonly userService: UserService;
    readonly prisma: PrismaService;
    constructor(userService: UserService, prisma: PrismaService);
    token: {
        value: string;
        expiry: Date;
    };
    getAuthToken(): Promise<string>;
    createInvoice(userEmail: string): Promise<{
        id: any;
        url: any;
    }>;
    webhook(body: any, hmac: string): Promise<{
        statusCode: number;
    }>;
    private verifyHMAC;
}
