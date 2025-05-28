import { connect } from "@/utils/db";
import { verify } from "jsonwebtoken";
import { ObjectId } from "bson";
import { Preference } from "mercadopago";
import mpClient from "@/lib/mercado-pago";

const dolar = 5.85;


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
    try {
      const { presentation_id, email, product_id } = req.body;
      const preference = new Preference(mpClient);

      const createdPreference = await preference.create({
        body: {
          external_reference: presentation_id, // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
          metadata: {
            presentation_id, // O Mercado Pago converte para snake_case, ou seja, testeId vai virar teste_id
            // userEmail: userEmail,
            // plan: '123'
            //etc
          },
          ...(email && {
            payer: {
              email: email,
            },
          }),

          items: [
            {
              id: "credit-1",
              description:
                "Ideal para criar uma mensagem especial para aquela pessoa que você ama",
              title: "1 Crédito",
              quantity: 1,
              unit_price: 4 * dolar,
              currency_id: "BRL",
              category_id: "category", // Recomendado inserir, mesmo que não tenha categoria - Aumenta a pontuação da sua integração com o Mercado Pago
            },
          ],
          payment_methods: {
            // Descomente para desativar métodos de pagamento
            //   excluded_payment_methods: [
            //     {
            //       id: "bolbradesco",
            //     },
            //     {
            //       id: "pec",
            //     },
            //   ],
            //   excluded_payment_types: [
            //     {
            //       id: "debit_card",
            //     },
            //     {
            //       id: "credit_card",
            //     },
            //   ],
            installments: 12, // Número máximo de parcelas permitidas - calculo feito automaticamente
          },
          auto_return: "approved",
          back_urls: {
            success: `https://www.lovescan.app/?status=sucesso`,
            failure: `https://www.lovescan.app/?status=falha`,
            pending: `https://www.lovescan.app/api/mercado-pago/pending`, // Criamos uma rota para lidar com pagamentos pendentes
          },
        },
      });

      if (!createdPreference.id) {
        throw new Error("No preferenceID");
      }

      return res.status(200).json({
        preferenceId: createdPreference.id,
        initPoint: createdPreference.init_point,
      });
      
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: err.message });
    }
  }
});
