"use client";

import { ChevronLeft } from "lucide-react";
import Button from "../components/Button";
import PresentationExample from "../Presentation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { closeModal } from "@/utils/modalControl";
import useMercadoPago from "@/hooks/useMercadoPago";
import { useAuth } from "../layout/context/AuthContext";
import { createImageUrl } from "@/utils/createImageUrl";

export default function Config_04(props) {
  const { createMercadoPagoCheckout } = useMercadoPago();

  const { data: session, status } = useSession();

  const router = useRouter();

  const { token, user } = useAuth();

  const [loadingPayment, setLoadingPayment] = useState(false);
  const [product, setProduct] = useState(null);
  const [userId, setUserId] = useState(null);

  const {
    userName,
    loveName,
    day,
    month,
    year,
    couplePhoto,
    imagesArray,
    descriptionsArray,
    letterContent,
    musicLink,
    credits
  } = props;

  const handlePayment = async () => {
    setLoadingPayment(true);

    try {
      const validImages = imagesArray.filter(
        (item) =>
          item !== null &&
          item !== undefined &&
          item.image !== null &&
          item.image !== undefined
      );

      // Processar as imagens: converter para blob
      const processedImages =
        validImages.length > 0
          ? await Promise.all(
            validImages.map(async (item) => {
              const blobFile = await fetch(item.image).then((r) => r.blob());
              return {
                blob: blobFile,
                description: item.description || "", // preservar a descrição
              };
            })
          )
          : [];

      // Extrair apenas os blobs para enviar ao Cloudinary
      const blobsOnly =
        validImages.length > 0
          ? processedImages.map((item) => item.blob)
          : [];

      // Salvar no Cloudinary
      const newImagesArray = validImages.length > 0 ? await createImageUrl(
        blobsOnly,
        "PRESENTATION_IMAGES"
      ) : []

      // Combinar as URLs retornadas com as descrições
      const finalImagesArray = validImages.length > 0 ? newImagesArray.map((imageUrl, index) => ({
        image: imageUrl,
        description: processedImages[index].description,
      })) : []

      const blobCouplePhoto = couplePhoto
        ? await fetch(couplePhoto).then((r) => r.blob())
        : "";
      const newCouplePhoto = couplePhoto
        ? await createImageUrl([blobCouplePhoto], "PRESENTATION_IMAGES")
        : "";

      const data = {
        userName,
        loveName,
        day,
        month,
        year,
        couplePhoto: newCouplePhoto[0],
        imagesArray: finalImagesArray,
        letterContent,
        musicLink,
      };

      // Primeiro salva os dados da apresentação
      const response = await axios.post(`/api/presentation`, {
        user_id: user?._id,
        presentationData: data,
      }).then(res => {
        if (res.data.creditConsumption) {

          router.push(`/presentationLink/${res.data.presentationId}`);
        }
      })

      createMercadoPagoCheckout({
        presentation_id: response.data.presentationId,
        user_id: user?._id,
        email: user?.email,
        product_id: "credit-1",
      });

      // Depois cria a preferência de pagamento
      // const response = await fetch('/api/mercadopago/create-preference', {
      //     method: 'POST',
      //     headers: {
      //         'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //         productId: 'credit-1',
      //         userId: token?._id,
      //     }),
      // });

      // const responseData = await response.json();

      // if (!response.ok) {
      //     throw new Error(responseData.error || 'Erro ao processar pagamento');
      // }

      // // Redireciona para o checkout do Mercado Pago
      // const checkoutUrl = `https://www.mercadopago.com.br/checkout/v1/redirect?preference-id=${responseData.preferenceId}`;
      // router.push(checkoutUrl);
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      alert(
        error.message ||
        "Não foi possível completar a operação. Por favor, tente novamente."
      );
    }
    // finally {
    //   setLoadingPayment(false);
    // }
  };

  return (
    <main className="card border-secondary bg-dark m-2 ">
      <div className="card-body">
        <div className="row d-flex justify-content-center">
          <div className="col-12 d-flex justify-content-start my-3">
            <h2 className="text-c-primary">Tudo pronto! ❤️</h2>
          </div>
          <div className="col-12 d-flex flex-column justify-content-start mt-3">
            <p>
              Sua apresentação está pronta! Siga os próximos passos para
              liberar o seu QR Code
            </p>
            <p>Gostaria de ver como ficou a sua apresentação?</p>
          </div>
          <div className="col-12 d-flex justify-content-center my-3">
            <Button
              rounded="full"
              className="mx-1"
              data-bs-toggle="modal"
              data-bs-target="#presentationPreviewModal"
            >
              Visualizar apresentação
            </Button>
          </div>
          {token ? (
            <>
              <div className="col-12 d-flex justify-content-center my-3">
                <Button
                  size="lg"
                  rounded="full"
                  variant="primary"
                  className="mx-1 pulse"
                  onClick={handlePayment}
                  loading={loadingPayment}
                >
                  Gerar QR Code
                </Button>
              </div>

              {(!credits || credits === 0) && (
                <div className="col-12 d-flex justify-content-center my-3">
                  <span>Libere sua apresentação por apenas R$ 23,40</span>
                </div>
              )
              }
            </>
          ) : (
            <>
              <div className="col-12 d-flex justify-content-start mt-3">
                <p>Para continuar, cadastre-se na nossa plataforma.</p>
              </div>
              <div className="col-12 d-flex justify-content-center mt-3">
                <Button
                  size="lg"
                  rounded="full"
                  variant="primary"
                  className="mx-1"
                  data-bs-toggle="modal"
                  data-bs-target="#loginModal"
                >
                  Cadastre-se
                </Button>
              </div>
            </>
          )}

          {/* <div className="col-12 d-flex justify-content-center my-3">
                        <img src="/LOGO_01.png" alt="" height={50} />

                    </div> */}

          <div className="col-12 d-flex justify-content-start mt-3">
            <Button
              outline
              variant="ghost"
              data-bs-target="#newPresentationCarousel"
              data-bs-slide-to={3}
            >
              <ChevronLeft /> Voltar
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
