import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Presentation01 from "@/src/Presentation01";
import { SpinnerLG } from "@/src/components/loading/Spinners";
import { Heart } from "lucide-react";

export default function Presentation() {
  const router = useRouter();
  const { presentation_id } = router.query;

  const [presentationData, setPresentationData] = useState(null);

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    if (presentation_id) dataFunction();
  }, [presentation_id]);

  const dataFunction = async () => {
    await axios
      .get(`/api/presentationView`, {
        params: { presentation_id: presentation_id },
      })
      .then((res) => {
        setPresentationData(res.data.presentationData);
        setLoadingPage(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingPage(false);
      });
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: "0",
        zIndex: "1000001",
      }}
    >
      {loadingPage ? (
        <div className="row">
          <div
            className="col-12 d-flex h-100 justify-content-center align-items-center"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <div
              className="col-12 d-flex text-center flex-column justify-content-center align-items-center "
              style={{ height: "350px" }}
            >
              <img src="/LOGO_02.png" alt="" style={{ height: "100px" }} className="pulse"/>
              <span>Aguarde...</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div
            className="col-12 d-flex h-100 justify-content-center align-items-center"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <Presentation01
              userName={presentationData?.userName}
              loveName={presentationData?.loveName}
              day={presentationData?.day}
              month={presentationData?.month}
              year={presentationData?.year}
              couplePhoto={presentationData?.couplePhoto}
              imagesArray={presentationData?.imagesArray}
              descriptionsArray={presentationData?.descriptionsArray}
              letterContent={presentationData?.letterContent}
              musicLink={presentationData?.musicLink}
            />
          </div>
        </div>
      )}
    </div>
  );
}
