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
exports.PaymobService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const crypto = require("crypto");
const prisma_service_1 = require("../prisma/prisma.service");
const user_service_1 = require("../user/user.service");
const paymobBaseUrl = "https://accept.paymob.com/api";
const apiKey = "ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6VXhNaUo5LmV5SndjbTltYVd4bFgzQnJJam8yTnpjeE5ESXNJbTVoYldVaU9pSXhOamMwTVRJME5qUXhMakF6TWpJNElpd2lZMnhoYzNNaU9pSk5aWEpqYUdGdWRDSjkuMUhYWXJLMFo3bjh1R1lSQ1psS21FZldOMWdaaHF0cVJ6X0NDdnU1RmhPYllTVjljYmlpSjNJUzJ5aEpNUzVfbFBtZ0wyekdEa2tnN2ZsZm80Z0x1OWc=";
let PaymobService = exports.PaymobService = class PaymobService {
    constructor(userService, prisma) {
        this.userService = userService;
        this.prisma = prisma;
    }
    async getAuthToken() {
        if (this.token && this.token.expiry > new Date()) {
            return this.token.value;
        }
        const url = `${paymobBaseUrl}/auth/tokens`;
        const body = {
            api_key: apiKey,
        };
        try {
            const { data } = await axios_1.default.post(url, body);
            this.token = {
                value: data.token,
                expiry: new Date(Date.now() + 50 * 60 * 1000),
            };
            return data.token;
        }
        catch (error) {
            console.log("error in getting paymob auth token", error.response.data);
            throw new common_1.InternalServerErrorException("Error in getting token");
        }
    }
    async createInvoice(userEmail) {
        console.log("creating invoice for", userEmail);
        const user = await this.userService.getUserByEmail(userEmail);
        if (!user) {
            throw new common_1.NotFoundException("User not found");
        }
        const token = await this.getAuthToken();
        if (user.lastPackageExpiry && user.lastPackageExpiry > new Date()) {
            throw new common_1.ConflictException("User already has a package");
        }
        const url = `${paymobBaseUrl}/ecommerce/orders`;
        const firstName = user.name?.split(" ")[0];
        const lastName = user.name?.split(" ")[1];
        const body = {
            auth_token: token,
            api_source: "INVOICE",
            amount_cents: user.referredById ? 8000 : 10000,
            currency: "EGP",
            shipping_data: {
                first_name: firstName ?? "NA",
                last_name: lastName ?? "NA",
                email: userEmail,
                phone_number: '01555065111',
            },
            integrations: ['3311583'],
            items: [],
            delivery_needed: false,
        };
        try {
            const { data } = await axios_1.default.post(url, body);
            return {
                id: data.id,
                url: data.url,
            };
        }
        catch (error) {
            console.log("error in creating invoice", error.response.data);
            throw new common_1.InternalServerErrorException("Error in creating invoice");
        }
    }
    async webhook(body, hmac) {
        const obj = body["obj"];
        this.verifyHMAC(obj, hmac, "23CD3023C8E4DA9EFCD6122A9FAE8BAE");
        const apiSource = obj["order"]["api_source"];
        if (!apiSource || apiSource !== "INVOICE")
            return;
        const userEmail = obj["order"]["shipping_data"]["email"];
        if (!userEmail)
            return;
        const transactionDoc = await this.prisma.transaction.create({
            data: {
                amount: obj["amount_cents"] / 100,
                currency: obj["currency"],
                transactionId: obj["id"].toString(),
                userEmail: userEmail,
                duration: 30,
                paymentGateway: "PAYMOB",
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
            statusCode: 200,
        };
    }
    verifyHMAC(body, hmac, secret) {
        const array = [
            "amount_cents",
            "created_at",
            "currency",
            "error_occured",
            "has_parent_transaction",
            "id",
            "integration_id",
            "is_3d_secure",
            "is_auth",
            "is_capture",
            "is_refunded",
            "is_standalone_payment",
            "is_voided",
            "order.id",
            "owner",
            "pending",
            "source_data.pan",
            "source_data.sub_type",
            "source_data.type",
            "success",
        ];
        const concatenatedString = array
            .map((key) => {
            const value = key.split(".").reduce((obj, k) => obj?.[k], body);
            return value !== undefined ? String(value) : "";
        })
            .join("");
        const hashed = crypto
            .createHmac("sha512", secret)
            .update(concatenatedString)
            .digest("hex");
        if (hashed !== hmac) {
            throw new common_1.InternalServerErrorException("HMAC verification failed");
        }
        return true;
    }
};
exports.PaymobService = PaymobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        prisma_service_1.PrismaService])
], PaymobService);
//# sourceMappingURL=paymob.service.js.map