"use client";

import { ChevronLeft, PartyPopper, TriangleAlert } from "lucide-react";
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
import Link from "next/link";

export default function Config_04_client(props) {
  const router = useRouter();
  const query = router.query;

  const [loadingSave, setLoadingSave] = useState(false);
  const [saveOk, setSaveOk] = useState(false);

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
    clientPhone,
    email,
    clientConfigName,
  } = props;

  const handleSave = async () => {
    setLoadingSave(true);

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
        validImages.length > 0 ? processedImages.map((item) => item.blob) : [];

      // Salvar no Cloudinary
      const newImagesArray =
        validImages.length > 0
          ? await createImageUrl(blobsOnly, "PRESENTATION_IMAGES")
          : [];

      // Combinar as URLs retornadas com as descrições
      const finalImagesArray =
        validImages.length > 0
          ? newImagesArray.map((imageUrl, index) => ({
              image: imageUrl,
              description: processedImages[index].description,
            }))
          : [];

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
        clientPhone,
        email,
        clientConfigName,
      };

      // Primeiro salva os dados da apresentação
      const response = await axios.patch(`/api/clientForm`, {
        presentation_id: query.presentation_id,
        presentationData: data,
      });

      if (response.status === 200) {
        alert("Apresentação salva com sucesso!");
        setLoadingSave(false);
        setSaveOk(true);
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      alert(
        error.message ||
          "Não foi possível completar a operação. Por favor, tente novamente."
      );
      setLoadingSave(false);
    }
    // finally {
    //   setLoadingSave(false);
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
              Sua apresentação está pronta! Sigua os próximos passos para
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
          <div className="col-12 d-flex justify-content-center my-3">
            <Button
              size="lg"
              rounded="full"
              variant="primary"
              className="mx-1 pulse"
              onClick={handleSave}
              loading={loadingSave}
              disabled={saveOk}
            >
              Salvar apresentação
            </Button>
          </div>
          <div className="col-12 d-flex justify-content-center text-center mt-3">
            <p>
              <TriangleAlert className="me-2" /> Após salvar a apresentação,
              informe a empresa para a qual enviou o formulário que a
              apresentação está pronta.
            </p>
          </div>

          {saveOk && (
            <div className="col-12 d-flex justify-content-center flex-column text-center mt-3 fadeItem">
              <span className="badge bg-c-success text-dark">
                <PartyPopper className="me-2" /> Apresentação salva com sucesso!
              </span>
              <p>
                O QR Code será liberado pela empresa e enviado para o seu
                e-mail.
              </p>
              <p>Obrigado!</p>
              <Link href="/" target="_blank">
                <img src="/LOGO_01.png" alt="" style={{ height: "50px" }} />
              </Link>
            </div>
          )}

          <div className="col-12 d-flex justify-content-start mt-3">
            <Button
              outline
              variant="ghost"
              data-bs-target="#newPresentationCarousel"
              data-bs-slide="prev"
            >
              <ChevronLeft /> Voltar
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
