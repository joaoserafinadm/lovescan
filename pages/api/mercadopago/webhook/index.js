// app/api/mercadopago-webhook/route.js

import { NextResponse } from "next/server";
import { Payment } from "mercadopago";
import mpClient, { verifyMercadoPagoSignature } from "@/lib/mercado-pago";
import { ObjectId } from "bson";

export async function POST(request) {
  try {
    verifyMercadoPagoSignature(request);

    const body = await request.json();

    const { type, data } = body;

    switch (type) {
      case "payment":
        const payment = new Payment(mpClient);
        const paymentData = await payment.get({ id: data.id });
        if (
          paymentData.status === "approved" || // Pagamento por cartão OU
          paymentData.date_approved !== null // Pagamento por Pix
        ) {
          const metadata = paymentData.metadata;

          const user_id = metadata.user_id;

          const credits = metadata.credits;

          const { db } = await connect();

          const userExist = await db
            .collection("users")
            .findOne({ _id: new ObjectId(user_id) });
          if (!userExist)
            return NextResponse.json({ received: false }, { status: 400 });

          await db
            .collection("users")
            .updateOne(
              { _id: new ObjectId(user_id) },
              { $set: { "companyData.credits": +credits } }
            );

          return NextResponse.json({ received: true }, { status: 200 });
        }
        break;
      // case "subscription_preapproval": Eventos de assinatura
      //   console.log("Subscription preapproval event");
      //   console.log(data);
      //   break;
      default:
        console.log("Unhandled event type:", type);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}
