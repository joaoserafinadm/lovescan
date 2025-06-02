import Button from "@/src/components/Button";
import { SpinnerLG } from "@/src/components/loading/Spinners";
import { useAuth } from "@/src/layout/context/AuthContext";
import InstagramEffect from "@/src/PresentationConfig1/InstagramEffect";
import PresentationPreviewModal from "@/src/PresentationConfig1/PresentationPreviewModal";
import { ImageUploadWithEffect } from "@/src/PresentationConfig1/SimpleInstagramEffect";
import YoutubePlayer from "@/src/PresentationConfig1/youtubePlayer";
import axios from "axios";
import { ChevronLeft, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import QrCodeGenerator from "@/src/presentationLink/QrCodeGenerator";
import useMercadoPago from "@/hooks/useMercadoPago";

export default function presentationLink() {

  const { createMercadoPagoCheckout } = useMercadoPago();

  const { user } = useAuth();
  const router = useRouter();
  const query = router.query;

  const [presentationData, setPresentationData] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const [credits, setCredits] = useState(0);

  const [loadingSave, setLoadingSave] = useState(false);

  useEffect(() => {
    if (query.presentation_id) {
      dataFunction();
    }
  }, [query]);

  const dataFunction = async () => {
    const data = {
      user_id: user._id,
      presentation_id: query.presentation_id,
    };

    await axios
      .get(`/api/presentationLink`, { params: data })
      .then((res) => {
        console.log(res.data);
        setPresentationData(res.data.presentation);
        setCredits(res.data.credits);
        setLoadingPage(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleQrCodeGenerate = async () => {
    if (+credits === 0) {
      setLoadingSave(true);

      await createMercadoPagoCheckout({
        presentation_id: query.presentationId,
        user_id: user?._id,
        email: user?.email,
        product_id: "credit-1",
      });
      setLoadingSave(false);

      return;
    }

    
    if (!query.presentation_id && !user) return;

    setLoadingSave(true);

    const data = {
      user_id: user._id,
      presentation_id: query.presentation_id,
    };

    await axios
      .post(`/api/presentationLink/generateQrCode`, data)
      .then((res) => {
        setLoadingSave(false);
        router.reload()
      })
      .catch((err) => {
        console.log(err);
        setLoadingSave(false);
      });
  };

  return (
    <div className="pages">
      <Link href="/" className="my-3 d-inline-block text-white">
        <span className="d-flex align-items-center">
          <ChevronLeft /> Voltar
        </span>
      </Link>
      {loadingPage ? (
        <SpinnerLG />
      ) : (
        <>
          <PresentationPreviewModal
            userName={presentationData?.userName}
            loveName={presentationData?.loveName}
            day={presentationData?.day}
            month={presentationData?.month}
            year={presentationData?.year}
            couplePhoto={presentationData?.couplePhoto.url}
            imagesArray={presentationData?.imagesArray}
            letterContent={presentationData?.letterContent}
          />

          <div className="card border-secondary bg-dark m-2 fadeItem mb-5">
            <div className="card-body">
              {/* Botões de ação responsivos */}
              <div className="row my-3 my-md-5">
                <div className="col-12 col-md-6 d-flex justify-content-center mb-3 mb-md-0 align-items-center">
                  <div>
                    <Button
                      size="lg"
                      rounded="full"
                      className="mx-1 w-100"
                      style={{ maxWidth: "300px" }}
                      data-bs-toggle="modal"
                      data-bs-target="#presentationPreviewModal"
                    >
                      Visualizar apresentação
                    </Button>
                  </div>
                </div>
                {presentationData?.status === "active" ? (
                  <div className="col-12 col-md-6 d-flex align-items-center flex-column text-center justify-content-center">
                    <QrCodeGenerator
                      url={`https://www.lovescan.app/presentation/${presentationData?._id}`}
                    />
                  </div>
                ) : (
                  <div className="col-12 col-md-6 d-flex align-items-center flex-column text-center justify-content-center">
                    <Button
                      size="lg"
                      rounded="full"
                      variant="primary"
                      className="mx-1 w-100"
                      style={{ maxWidth: "300px" }}
                      loading={loadingSave}
                      onClick={handleQrCodeGenerate}
                    >
                      Gerar QR Code
                    </Button>
                    {/* {+credits === 0 && (
                      <span className="text-c-danger d-flex align-items-center">
                        <TriangleAlert className="me-2" /> Atenção! Você está
                        sem créditos
                      </span>
                    )} */}
                  </div>
                )}
              </div>

              <hr />

              {/* Seção de informações principal responsiva */}
              <div className="row">
                <div className="col-12 col-md-4 col-lg-3 mb-4 mb-md-0">
                  <div className="d-flex justify-content-center">
                    <div style={{ maxWidth: "300px", width: "100%" }}>
                      <InstagramEffect
                        imageUrl={presentationData?.couplePhoto?.url}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-12 col-md-8 col-lg-9">
                  <div className="row">
                    <div className="col-12">
                      <h4 className="mb-3">Informações</h4>
                    </div>
                    <hr className="mb-3" />
                    <div className="col-12">
                      <div className="mb-3">
                        <strong>Casal:</strong> {presentationData?.userName} &{" "}
                        {presentationData?.loveName}
                      </div>

                      <div className="mb-3">
                        <strong>Quando se conheceram:</strong>{" "}
                        {presentationData?.day}/{presentationData?.month}/
                        {presentationData?.year}
                      </div>

                      <div className="mb-3">
                        <strong>Declaração:</strong>
                        <textarea
                          className="form-control bg-dark text-light border-secondary mt-2"
                          rows="4"
                          disabled
                          value={presentationData?.letterContent}
                          style={{ resize: "none" }}
                        />
                      </div>

                      <div className="mb-3">
                        <strong>Trilha sonora:</strong>
                        <div className="mt-2">
                          <YoutubePlayer
                            videoUrl={presentationData?.musicLink}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="my-4" />

              {/* Seção de imagens responsiva */}
              <div className="row">
                <div className="col-12">
                  <h4 className="mb-4">Imagens</h4>
                </div>
                <div className="col-12">
                  <div className="row g-3">
                    {presentationData?.imagesArray?.map((elem, index) => (
                      <div
                        key={index}
                        className="col-6 col-sm-4 col-md-3 col-lg-3"
                      >
                        <div className="text-center">
                          <div className="mb-2">
                            <InstagramEffect imageUrl={elem?.image?.url} />
                          </div>
                          <small className="text-muted d-block px-2">
                            {elem?.description}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @media (max-width: 576px) {
          .card-body {
            padding: 1rem;
          }

          h4 {
            font-size: 1.25rem;
          }

          .form-control {
            font-size: 0.875rem;
          }
        }

        @media (max-width: 768px) {
          .pages {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
