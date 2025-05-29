// // app/api/mercadopago-webhook/route.js

// pages/api/mercadopago-webhook.js

import { Payment } from "mercadopago";
import mpClient, { verifyMercadoPagoSignature } from "@/lib/mercado-pago";
import { connect } from "@/lib/mongodb"; // Adicione este import
import { ObjectId } from "bson";

export default async function handler(req, res) {
  // Verificar se é método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }
  try {
    // Verificar assinatura do MercadoPago
    verifyMercadoPagoSignature(req);

    const body = req.body;
    const { type, data } = body;

    console.log("Webhook recebido:", { type, data });

    switch (type) {
      case "payment":
        const payment = new Payment(mpClient);
        const paymentData = await payment.get({ id: data.id });
        
        console.log("Dados do pagamento:", paymentData);

        // Verificar se o pagamento foi aprovado
        if (
          paymentData.status === "approved" || 
          paymentData.date_approved !== null
        ) {
          const metadata = paymentData.metadata;
          const user_id = metadata.user_id;
          const credits = parseInt(metadata.credits);

          if (!user_id || !credits) {
            console.error("Metadata inválida:", metadata);
            return res.status(400).json({ error: "Metadata inválida" });
          }

          const { db } = await connect();

          // Verificar se o usuário existe
          const userExist = await db
            .collection("users")
            .findOne({ _id: new ObjectId(user_id) });
            
          if (!userExist) {
            console.error("Usuário não encontrado:", user_id);
            return res.status(400).json({ error: "Usuário não encontrado" });
          }

          // Verificar se o pagamento já foi processado (evitar duplicação)
          const existingPayment = await db
            .collection("processed_payments")
            .findOne({ payment_id: data.id });

          if (existingPayment) {
            console.log("Pagamento já processado:", data.id);
            return res.status(200).json({ received: true });
          }

          // Registrar o pagamento como processado
          await db
            .collection("processed_payments")
            .insertOne({
              payment_id: data.id,
              user_id: user_id,
              credits: credits,
              processed_at: new Date(),
              payment_status: paymentData.status
            });

          // Incrementar créditos do usuário (não substituir)
          await db
            .collection("users")
            .updateOne(
              { _id: new ObjectId(user_id) },
              { 
                $inc: { "companyData.credits": +credits },
                $set: { "companyData.lastCreditUpdate": new Date() }
              }
            );

          console.log(`Créditos adicionados: ${credits} para usuário ${user_id}`);
          return res.status(200).json({ received: true });
        } else {
          console.log("Pagamento não aprovado:", paymentData.status);
        }
        break;

      case "subscription_preapproval":
        console.log("Evento de assinatura:", data);
        // Implementar lógica de assinatura se necessário
        break;

      default:
        console.log("Tipo de evento não tratado:", type);
    }

    return res.status(200).json({ received: true });
    
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(500).json({ error: "Falha no processamento do webhook" });
  }
}





// import { NextResponse } from "next/server";
// import { Payment } from "mercadopago";
// import mpClient, { verifyMercadoPagoSignature } from "@/lib/mercado-pago";
// import { ObjectId } from "bson";
// import { connect } from "@/utils/db";

// export default async function POST(request) {
//   try {
//     verifyMercadoPagoSignature(request);

//     const body = await request.json();

//     const { type, data } = body;

//     switch (type) {
//       case "payment":
//         const payment = new Payment(mpClient);
//         const paymentData = await payment.get({ id: data.id });
//         if (
//           paymentData.status === "approved" || // Pagamento por cartão OU
//           paymentData.date_approved !== null // Pagamento por Pix
//         ) {
//           const metadata = paymentData.metadata;

//           const user_id = metadata.user_id;

//           const credits = metadata.credits;

//           const { db } = await connect();

//           const userExist = await db
//             .collection("users")
//             .findOne({ _id: new ObjectId(user_id) });
//           if (!userExist)
//             return NextResponse.json({ received: false }, { status: 400 });

//           await db
//             .collection("users")
//             .updateOne(
//               { _id: new ObjectId(user_id) },
//               { $inc: { "companyData.credits": +credits } }
//             );

//           return NextResponse.json({ received: true }, { status: 200 });
//         }
//         break;
//       // case "subscription_preapproval": Eventos de assinatura
//       //   console.log("Subscription preapproval event");
//       //   console.log(data);
//       //   break;
//       default:
//         console.log("Unhandled event type:", type);
//     }

//     return NextResponse.json({ received: true }, { status: 200 });
//   } catch (error) {
//     console.error("Error handling webhook:", error);
//     return NextResponse.json(
//       { error: "Webhook handler failed" },
//       { status: 500 }
//     );
//   }
// }
