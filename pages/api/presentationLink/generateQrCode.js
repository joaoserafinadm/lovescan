import { connect } from "@/utils/db";
import { verify } from "jsonwebtoken";
import { ObjectId } from "bson";
import { Resend } from "resend";
import QRCode from "qrcode";

// Inicializar Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Função para gerar QR Code
async function generateQRCode(url) {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      width: 300,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });
    return qrCodeDataUrl;
  } catch (error) {
    console.error("Erro ao gerar QR Code:", error);
    throw error;
  }
}

// Função para enviar email para a empresa (usuário)
async function sendCompanyEmail(
  userEmail,
  presentationId,
  qrCodeDataUrl,
  clientName,
  clientPhone,
  clientEmail,
  clientConfigName
) {
  try {
    const presentationUrl = `https://www.lovescan.app/presentation/${presentationId}`;

    // Converter o Data URL do QR Code para buffer
    const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "");
    const qrCodeBuffer = Buffer.from(base64Data, "base64");

    const { data, error } = await resend.emails.send({
      from: "LoveScan <noreply@lovescan.app>",
      to: [userEmail],
      subject: `Apresentação ${clientName} ativada com sucesso! 🎉`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">Sua apresentação foi ativada!</h2>
          
          <p style="color: #666; font-size: 16px;">
            Olá! Sua apresentação no LoveScan foi ativada com sucesso e já está disponível para visualização.
          </p>
          
          <p style="color: #666; font-size: 14px;">
            <strong>Detalhes do cliente:</strong><br>
            Nome cadastrado pela empresa: ${clientName}<br>
            Nome informado pelo cliente: ${clientConfigName}<br>
            Telefone: ${clientPhone}<br>
            Email: ${clientEmail}
          </p>
          
          <p style="color: #666; font-size: 14px; text-align: center;">
            Acesse a apresentação através do link:<br>
            <a href="${presentationUrl}" style="color: #007bff; text-decoration: none;">
              ${presentationUrl}
            </a>
          </p>
          
          <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; text-align: center;">
            <p style="color: #999; font-size: 12px;">
              Este email foi enviado automaticamente pelo LoveScan.<br>
              Painel administrativo disponível em seu dashboard.
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `qrcode-apresentacao-${presentationId}.png`,
          content: qrCodeBuffer,
          type: "image/png",
          disposition: "attachment",
        },
      ],
    });

    if (error) {
      console.error("Erro ao enviar email para empresa:", error);
      throw error;
    }

    console.log("Email enviado para empresa:", data);
    return data;
  } catch (error) {
    console.error("Falha ao enviar email para empresa:", error);
    throw error;
  }
}

// Função para enviar email para o cliente
async function sendClientEmail(clientEmail, presentationId, qrCodeDataUrl) {
  try {
    const presentationUrl = `https://www.lovescan.app/presentation/${presentationId}`;

    // Converter o Data URL do QR Code para buffer
    const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, "");
    const qrCodeBuffer = Buffer.from(base64Data, "base64");

    const { data, error } = await resend.emails.send({
      from: "LoveScan <noreply@lovescan.app>",
      to: [clientEmail],
      subject: "Sua apresentação LoveScan está pronta! 💝",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; text-align: center;">Sua apresentação especial está pronta!</h2>
          
          <p style="color: #666; font-size: 16px;">
            Olá! Sua apresentação personalizada no LoveScan está disponível para visualização.
          </p>
          
          <p style="color: #666; font-size: 16px;">
            Escaneie o QR Code em anexo ou clique no link abaixo para acessar sua apresentação especial.
          </p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${presentationUrl}" 
               style="background-color: #007bff; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Ver Minha Apresentação
            </a>
          </div>
          
          <p style="color: #666; font-size: 14px; text-align: center;">
            Ou acesse diretamente através do link:<br>
            <a href="${presentationUrl}" style="color: #007bff; text-decoration: none;">
              ${presentationUrl}
            </a>
          </p>
          
          <div style="border-top: 1px solid #eee; margin-top: 30px; padding-top: 20px; text-align: center;">
            <p style="color: #999; font-size: 12px;">
              Este email foi enviado automaticamente pelo LoveScan.<br>
              Aproveite sua apresentação especial! 💕
            </p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `sua-apresentacao-lovescan.png`,
          content: qrCodeBuffer,
          type: "image/png",
          disposition: "attachment",
        },
      ],
    });

    if (error) {
      console.error("Erro ao enviar email para cliente:", error);
      throw error;
    }

    console.log("Email enviado para cliente:", data);
    return data;
  } catch (error) {
    console.error("Falha ao enviar email para cliente:", error);
    throw error;
  }
}

const authenticated = (fn) => async (req, res) => {
  verify(
    req.cookies.auth,
    process.env.JWT_SECRET,
    async function (err, decoded) {
      if (!err && decoded) {
        return await fn(req, res);
      }
      res.status(500).json({ message: "You are not authenticated." });
    }
  );
};

export default authenticated(async (req, res) => {
  if (req.method === "POST") {
    const { user_id, presentation_id } = req.body;

    if (!user_id || !presentation_id)
      return res.status(400).json({ error: "Missing body parameters." });

    const { db } = await connect();

    const userExist = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user_id) });
    if (!userExist)
      return res.status(400).json({ error: "User does not exist." });

    const presentationExist = await db
      .collection("presentations")
      .findOne({ _id: new ObjectId(presentation_id) });
    if (!presentationExist)
      return res.status(400).json({ error: "Presentation does not exist." });

    if (+userExist.credits === 0)
      return res.status(400).json({ error: "You do not have enough credits." });

    // Atualizar status da apresentação
    const presentationResponse = await db
      .collection("presentations")
      .updateOne(
        { _id: new ObjectId(presentation_id) },
        { $set: { status: "active" } }
      );

    // Decrementar créditos do usuário
    const response = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(user_id) }, { $inc: { credits: -1 } });

    // Gerar QR Code e enviar emails
    try {
      const presentationUrl = `https://www.lovescan.app/presentation/${presentation_id}`;
      const qrCodeDataUrl = await generateQRCode(presentationUrl);

      // Sempre enviar email para a empresa (usuário)
      await sendCompanyEmail(
        userExist.email,
        presentation_id,
        qrCodeDataUrl,
        presentationExist.clientName,
        presentationExist.clientPhone,
        presentationExist.clientEmail,
        presentationExist.clientConfigName
      );
      console.log(`Email enviado para empresa: ${userExist.email}`);

      // Se existir email do cliente, enviar também para ele
      if (presentationExist.email) {
        await sendClientEmail(
          presentationExist.email,
          presentation_id,
          qrCodeDataUrl
        );
        console.log(`Email enviado para cliente: ${presentationExist.email}`);
      }
    } catch (emailError) {
      console.error("Erro ao enviar emails:", emailError);
      // Não falhar a operação por causa do email, apenas logar o erro
      // A apresentação já foi ativada e os créditos decrementados
    }

    return res.status(200).json({ message: "Success" });
  }
});
