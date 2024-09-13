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
exports.PaypalService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const CLIENT_ID = "AcVuEEpcbvJn5uRntKFdkw7ZilfsCOLc8datCusTsvExpNQfuWadJdh8qY4hlV9Za-pJkQfTDEczwrGQ";
const APP_SECRET = "EF2ZIY6eg1TU-Kk2A3waQfJGSWzyl7CVAc354LDRZzHiPkKQd--45pBGMRBHgsjbdQ5Pz7SChZJ1ntAp";
const base = "https://api-m.sandbox.paypal.com";
let PaypalService = exports.PaypalService = class PaypalService {
    constructor(prisma, httpService) {
        this.prisma = prisma;
        this.httpService = httpService;
    }
    async generateAccessToken() {
        const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");
        const response = await this.httpService.axiosRef.post(`${base}/v1/oauth2/token`, "grant_type=client_credentials", {
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });
        const jsonData = await this.handleResponse(response);
        return jsonData.access_token;
    }
    async createOrder(referredById) {
        const accessToken = await this.generateAccessToken();
        const url = `${base}/v2/checkout/orders`;
        const payload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: referredById ? "8" : "10",
                    },
                },
            ],
        };
        const response = await this.httpService.axiosRef.post(url, JSON.stringify(payload), {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return await this.handleResponse(response);
    }
    async capturePayment(orderID) {
        const accessToken = await this.generateAccessToken();
        const url = `${base}/v2/checkout/orders/${orderID}/capture`;
        const response = await this.httpService.axiosRef.post(url, undefined, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return await this.handleResponse(response);
    }
    async approveOrder(orderID, userEmail) {
        const accessToken = await this.generateAccessToken();
        const url = `${base}/v2/checkout/orders/${orderID}`;
        let response = null;
        try {
            response = await this.httpService.axiosRef.get(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
            });
        }
        catch (e) {
            console.log(e);
            throw new common_1.BadRequestException("Cannot check paypal payment status " + e);
        }
        const jsonData = await this.handleResponse(response);
        const isPaymentCompleted = jsonData.status === "COMPLETED";
        if (!isPaymentCompleted)
            throw new common_1.BadRequestException("Paypal payment not completed, contact support for more details");
        const transactionDoc = await this.prisma.transaction.create({
            data: {
                amount: parseFloat(jsonData.purchase_units[0].amount.value),
                currency: jsonData.purchase_units[0].amount.currency_code,
                transactionId: jsonData.id,
                userEmail: userEmail,
                duration: 30,
                paymentGateway: "PAYPAL",
            },
        });
        await this.prisma.user.update({
            where: {
                email: userEmail,
            },
            data: {
                lastPaymentAt: new Date(),
                lastPackageExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                lastPackageTransactionId: transactionDoc.id,
            },
        });
        return {
            message: "Payment successful",
        };
    }
    async handleResponse(response) {
        if (response.status === 200 || response.status === 201) {
            console.log(response);
            return response.data;
        }
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }
};
exports.PaypalService = PaypalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, axios_1.HttpService])
], PaypalService);
//# sourceMappingURL=paypal.service.js.map