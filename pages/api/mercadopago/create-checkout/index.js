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
      const { user_id, presentation_id, email, product_id } = req.body;
      const preference = new Preference(mpClient);

      const productSelected = PRODUCTS.find((p) => p.id === product_id);

      const createdPreference = await preference.create({
        body: {
          external_reference: presentation_id, // IMPORTANTE: Isso aumenta a pontuação da sua integração com o Mercado Pago - É o id da compra no nosso sistema
          metadata: {
            user_id,
            credits: productSelected.credits, // O Mercado Pago converte para snake_case, ou seja, testeId vai virar teste_id
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
              id: productSelected.id,
              description: productSelected.description,
              title: productSelected.title,
              quantity: 1,
              unit_price: +productSelected.price,
              currency_id: "BRL",
              category_id: productSelected.id, // Recomendado inserir, mesmo que não tenha categoria - Aumenta a pontuação da sua integração com o Mercado Pago
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
            success: `https://www.lovescan.app/presentationLink/${presentation_id}`,
            failure: `https://www.lovescan.app/presentationLink/${presentation_id}`,
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

const PRODUCTS = [
  {
    id: "credit-1",
    title: "1 Crédito",
    description:
      "Ideal para criar uma mensagem especial para aquela pessoa que você ama",
    // price: 4 * dolar,
    price: 1,
    credits: 1,
    recommended: false,
    userType: "individual",
  },
  {
    id: "credit-10",
    title: "10 Créditos",
    description:
      "Perfeito para floricultura, presentes personalizados ou pequenas celebrações",
    // price: 8 * 4 * dolar,
    price: 1,
    credits: 10,
    recommended: true,
    userType: "business",
  },
  {
    id: "credit-20",
    title: "20 Créditos",
    description: "Ideal para lojas, joalherias ou eventos de médio porte",
    // price: 14 * 4 * dolar,
    price: 1,
    credits: 20,
    recommended: false,
    userType: "business",
  },
  {
    id: "credit-50",
    title: "50 Créditos",
    description: "Para empresas com alto volume de vendas ou grandes eventos",
    // price: 30 * 4 * dolar,
    price: 1,
    credits: 50,
    recommended: false,
    userType: "business",
  },
];
