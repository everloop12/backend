import { HttpService } from "@nestjs/axios";
import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
// const { CLIENT_ID, APP_SECRET } = process.env;
const CLIENT_ID =
  "AcVuEEpcbvJn5uRntKFdkw7ZilfsCOLc8datCusTsvExpNQfuWadJdh8qY4hlV9Za-pJkQfTDEczwrGQ";
const APP_SECRET =
  "EF2ZIY6eg1TU-Kk2A3waQfJGSWzyl7CVAc354LDRZzHiPkKQd--45pBGMRBHgsjbdQ5Pz7SChZJ1ntAp";
const base = "https://api-m.sandbox.paypal.com";

@Injectable()
export class PaypalService {
  constructor(readonly prisma: PrismaService, private readonly httpService: HttpService) { }

  async generateAccessToken() {
    const auth = Buffer.from(CLIENT_ID + ":" + APP_SECRET).toString("base64");

    const response = await this.httpService.axiosRef.post(`${base}/v1/oauth2/token`, "grant_type=client_credentials", {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    // const response = await fetch(`${base}/v1/oauth2/token`, {
    //   method: "post",
    //   body: "grant_type=client_credentials",
    //   headers: {
    //     Authorization: `Basic ${auth}`,
    //   },
    // });

    const jsonData = await this.handleResponse(response);
    return jsonData.access_token;
  }

  async createOrder(referredById: string) {
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

    // const response = await fetch(url, {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    //   method: "POST",
    //   body: JSON.stringify(payload),
    // });

    return await this.handleResponse(response);
  }

  // capture payment for an order
  async capturePayment(orderID: string) {
    const accessToken = await this.generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderID}/capture`;

    const response = await this.httpService.axiosRef.post(url, undefined, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // const response = await fetch(url, {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });

    return await this.handleResponse(response);
  }

  async approveOrder(orderID: string, userEmail: string) {
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

      // response = await fetch(url, {
      //   method: "get",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });
    } catch (e) {
      console.log(e);
      throw new BadRequestException("Cannot check paypal payment status " + e);
    }

    const jsonData = await this.handleResponse(response);

    const isPaymentCompleted = jsonData.status === "COMPLETED";

    if (!isPaymentCompleted)
      throw new BadRequestException(
        "Paypal payment not completed, contact support for more details"
      );

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
}
