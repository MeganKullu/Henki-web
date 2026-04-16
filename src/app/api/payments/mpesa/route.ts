import { NextRequest, NextResponse } from "next/server";

// M-Pesa Daraja API stub
// In production, replace with real Safaricom Daraja API integration

interface MpesaConfig {
  consumerKey: string;
  consumerSecret: string;
  shortcode: string;
  passkey: string;
  callbackUrl: string;
}

function getMpesaConfig(): MpesaConfig {
  return {
    consumerKey: process.env.MPESA_CONSUMER_KEY || "",
    consumerSecret: process.env.MPESA_CONSUMER_SECRET || "",
    shortcode: process.env.MPESA_SHORTCODE || "174379",
    passkey: process.env.MPESA_PASSKEY || "",
    callbackUrl:
      process.env.MPESA_CALLBACK_URL ||
      "https://henkielectronics.co.ke/api/payments/mpesa/callback",
  };
}

async function getMpesaToken(config: MpesaConfig): Promise<string> {
  const auth = Buffer.from(
    `${config.consumerKey}:${config.consumerSecret}`
  ).toString("base64");

  const res = await fetch(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );

  const data = await res.json();
  return data.access_token;
}

export async function POST(req: NextRequest) {
  try {
    const { phone, amount, orderId } = await req.json();

    if (!phone || !amount || !orderId) {
      return NextResponse.json(
        { error: "Phone, amount and orderId are required" },
        { status: 400 }
      );
    }

    // Format phone: 0712345678 -> 254712345678
    const formattedPhone = phone
      .replace(/^0/, "254")
      .replace(/\s+/g, "")
      .replace(/[^0-9]/g, "");

    const config = getMpesaConfig();

    // In sandbox/dev mode, return a stub response
    if (!config.consumerKey || process.env.NODE_ENV === "development") {
      console.log(
        `[M-Pesa STUB] STK Push to ${formattedPhone} for KSh ${amount} | Order: ${orderId}`
      );
      return NextResponse.json({
        success: true,
        message: "STK Push sent (sandbox mode)",
        checkoutRequestId: `STUB-${Date.now()}`,
      });
    }

    const token = await getMpesaToken(config);

    const timestamp = new Date()
      .toISOString()
      .replace(/[-:.TZ]/g, "")
      .slice(0, 14);

    const password = Buffer.from(
      `${config.shortcode}${config.passkey}${timestamp}`
    ).toString("base64");

    const stkRes = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          BusinessShortCode: config.shortcode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: Math.ceil(amount),
          PartyA: formattedPhone,
          PartyB: config.shortcode,
          PhoneNumber: formattedPhone,
          CallBackURL: `${config.callbackUrl}?orderId=${orderId}`,
          AccountReference: `HENKI-${orderId}`,
          TransactionDesc: "Henki Electronics Purchase",
        }),
      }
    );

    const stkData = await stkRes.json();

    if (stkData.ResponseCode === "0") {
      return NextResponse.json({
        success: true,
        checkoutRequestId: stkData.CheckoutRequestID,
        message: stkData.CustomerMessage,
      });
    }

    return NextResponse.json(
      { error: stkData.errorMessage || "STK Push failed" },
      { status: 400 }
    );
  } catch (error) {
    console.error("M-Pesa error:", error);
    return NextResponse.json(
      { error: "M-Pesa service unavailable" },
      { status: 500 }
    );
  }
}

// M-Pesa callback handler
export async function GET() {
  return NextResponse.json({ message: "M-Pesa callback endpoint" });
}
