import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import axios from "axios";
import * as crypto from "crypto";
import * as fs from "fs";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "src/user/user.service";

const paymobBaseUrl = "https://accept.paymob.com/api";
const apiKey =
  "ZXlKMGVYQWlPaUpLVjFRaUxDSmhiR2NpT2lKSVV6VXhNaUo5LmV5SndjbTltYVd4bFgzQnJJam8yTnpjeE5ESXNJbTVoYldVaU9pSXhOamMwTVRJME5qUXhMakF6TWpJNElpd2lZMnhoYzNNaU9pSk5aWEpqYUdGdWRDSjkuMUhYWXJLMFo3bjh1R1lSQ1psS21FZldOMWdaaHF0cVJ6X0NDdnU1RmhPYllTVjljYmlpSjNJUzJ5aEpNUzVfbFBtZ0wyekdEa2tnN2ZsZm80Z0x1OWc=";

@Injectable()
export class PaymobService {
  constructor(
    readonly userService: UserService,
    readonly prisma: PrismaService
  ) { }
  token: { value: string; expiry: Date };

  async getAuthToken(): Promise<string> {
    if (this.token && this.token.expiry > new Date()) {
      return this.token.value;
    }

    const url = `${paymobBaseUrl}/auth/tokens`;
    const body = {
      api_key: apiKey,
    };

    try {
      const { data } = await axios.post(url, body);
      // expires after 50 minutes
      this.token = {
        value: data.token,
        expiry: new Date(Date.now() + 50 * 60 * 1000),
      };
      return data.token;
    } catch (error) {
      console.log("error in getting paymob auth token", error.response.data);
      throw new InternalServerErrorException("Error in getting token");
    }
  }

  async createInvoice(userEmail: string) {
    console.log("creating invoice for", userEmail);
    const user = await this.userService.getUserByEmail(userEmail);

    if (!user) {
      throw new NotFoundException("User not found");
    }

    const token = await this.getAuthToken();
    // check if user already has a package
    if (user.lastPackageExpiry && user.lastPackageExpiry > new Date()) {
      throw new ConflictException("User already has a package");
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
      const { data } = await axios.post(url, body);
      return {
        id: data.id,
        url: data.url,
      };
    } catch (error) {
      console.log("error in creating invoice", error.response.data);
      throw new InternalServerErrorException("Error in creating invoice");
    }
  }

  // async createOrder(token: string) {
  //   const url = `${paymobBaseUrl}/ecommerce/orders`;

  //   const body = {
  //     auth_token: token,
  //     delivery_needed: false,
  //     amount_cents: 100,
  //     items: [],
  //   };

  //   try {
  //     const { data } = await axios.post(url, body);
  //     return data;
  //   } catch (error) {
  //     console.log("error in creating order", error.response.data);
  //     throw new InternalServerErrorException("Error in creating order");
  //   }
  // }

  // async createPaymentKey() {
  //   const url = `${paymobBaseUrl}/acceptance/payment_keys`;
  //   const token = await this.getAuthToken();

  //   const order = await this.createOrder(token);
  //   const orderId = order.id;

  //   const body = {
  //     auth_token: token,
  //     amount_cents: order.amount_cents,
  //     expiration: 3600,
  //     order_id: orderId,
  //     billing_data: {
  //       email: "test@paymob.com",
  //       first_name: "test",
  //       last_name: "test",
  //       phone_number: "NA",
  //       street: "NA",
  //       building: "NA",
  //       floor: "NA",
  //       apartment: "NA",
  //       city: "NA",
  //       country: "NA",
  //     },
  //     currency: "EGP",
  //     integration_id: 3311583,
  //     lock_order_when_paid: true,
  //   };
  //   // 42c24d09d862e5f866164608ddedbac581c399bf639f4edde1390bdb
  //   try {
  //     const { data } = await axios.post(url, body);
  //     return data.token;
  //   } catch (error) {
  //     console.log("error in creating payment key", error.response.data);
  //     throw new InternalServerErrorException("Error in creating payment key");
  //   }
  // }

  async webhook(body: any, hmac: string) {
    const obj = body["obj"];
    this.verifyHMAC(obj, hmac, "23CD3023C8E4DA9EFCD6122A9FAE8BAE");

    const apiSource = obj["order"]["api_source"];
    if (!apiSource || apiSource !== "INVOICE") return;

    const userEmail = obj["order"]["shipping_data"]["email"] as string;
    if (!userEmail) return;

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

  private verifyHMAC(body: unknown, hmac: string, secret: string) {
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

    // Concatenate values of specified keys
    const concatenatedString = array
      .map((key) => {
        const value = key.split(".").reduce((obj, k) => obj?.[k], body);
        return value !== undefined ? String(value) : "";
      })
      .join("");

    // hash the concatenated string with the secret - sha512
    const hashed = crypto
      .createHmac("sha512", secret)
      .update(concatenatedString)
      .digest("hex");

    if (hashed !== hmac) {
      throw new InternalServerErrorException("HMAC verification failed");
    }

    return true;
  }
}
