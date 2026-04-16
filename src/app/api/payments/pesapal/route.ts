import { NextRequest, NextResponse } from "next/server";

// Pesapal v3 API stub for card payments
// Docs: https://developer.pesapal.com/

export async function POST(req: NextRequest) {
  try {
    const { orderId, amount, customerEmail, customerPhone, description } =
      await req.json();

    if (!orderId || !amount || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const consumerKey = process.env.PESAPAL_CONSUMER_KEY;
    const consumerSecret = process.env.PESAPAL_CONSUMER_SECRET;

    if (!consumerKey || !consumerSecret) {
      // Return stub in dev mode
      console.log(`[Pesapal STUB] Order ${orderId} - KSh ${amount}`);
      return NextResponse.json({
        success: true,
        redirectUrl: `/checkout?stub=pesapal&orderId=${orderId}`,
        orderTrackingId: `STUB-${Date.now()}`,
      });
    }

    // Step 1: Get auth token
    const authRes = await fetch(
      "https://cybqa.pesapal.com/pesapalv3/api/Auth/RequestToken",
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          consumer_key: consumerKey,
          consumer_secret: consumerSecret,
        }),
      }
    );

    const { token } = await authRes.json();

    // Step 2: Register IPN
    const ipnRes = await fetch(
      "https://cybqa.pesapal.com/pesapalv3/api/URLSetup/RegisterIPN",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          url:
            process.env.PESAPAL_IPN_URL ||
            "https://henkielectronics.co.ke/api/payments/pesapal/ipn",
          ipn_notification_type: "GET",
        }),
      }
    );

    const ipnData = await ipnRes.json();

    // Step 3: Submit order
    const orderRes = await fetch(
      "https://cybqa.pesapal.com/pesapalv3/api/Transactions/SubmitOrderRequest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: orderId,
          currency: "KES",
          amount,
          description: description || "Henki Electronics Purchase",
          callback_url:
            process.env.PESAPAL_CALLBACK_URL ||
            `https://henkielectronics.co.ke/checkout/success`,
          notification_id: ipnData.ipn_id,
          billing_address: {
            email_address: customerEmail,
            phone_number: customerPhone,
          },
        }),
      }
    );

    const orderData = await orderRes.json();

    return NextResponse.json({
      success: true,
      redirectUrl: orderData.redirect_url,
      orderTrackingId: orderData.order_tracking_id,
    });
  } catch (error) {
    console.error("Pesapal error:", error);
    return NextResponse.json(
      { error: "Pesapal service unavailable" },
      { status: 500 }
    );
  }
}
