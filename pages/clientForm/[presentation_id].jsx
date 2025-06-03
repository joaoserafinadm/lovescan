import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Presentation01 from "@/src/Presentation01";
import { SpinnerLG } from "@/src/components/loading/Spinners";
import { Heart } from "lucide-react";
import PresentationPreviewModal from "@/src/PresentationConfig1/PresentationPreviewModal";
import Config_01 from "@/src/PresentationConfig1/Config_01";
import Config_02 from "@/src/PresentationConfig1/Config_02";
import Config_03 from "@/src/PresentationConfig1/Config_03";
import Config_031 from "@/src/PresentationConfig1/Config_031";
import Config_04 from "@/src/PresentationConfig1/Config_04";
import Config_04_client from "@/src/PresentationConfig1/Config_04_client";
import Config_001 from "@/src/PresentationConfig1/Config_001";

export default function Presentation() {
  const router = useRouter();
  const { presentation_id } = router.query;

  const [presentationData, setPresentationData] = useState(null);

  const [clientConfigName, setClientConfigName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [email, setEmail] = useState("");

  const [userName, setUserName] = useState("");
  const [loveName, setLoveName] = useState("");

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [couplePhoto, setCouplePhoto] = useState("");

  const [imagesArray, setImagesArray] = useState([]);
  const [descriptionsArray, setDescriptionsArray] = useState([]);

  const [letterContent, setLetterContent] = useState("");

  const [musicLink, setMusicLink] = useState("");

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    if (presentation_id) dataFunction();
  }, [presentation_id]);

  const dataFunction = async () => {
    await axios
      .get(`/api/clientForm`, {
        params: { presentation_id: presentation_id },
      })
      .then((res) => {
        setPresentationData(res.data.presentationData);
        setUserName(res.data?.presentationData?.userName);
        setLoveName(res.data?.presentationData?.loveName);
        setDay(res.data?.presentationData?.day);
        setMonth(res.data?.presentationData?.month);
        setYear(res.data?.presentationData?.year);
        setCouplePhoto(res.data?.presentationData?.couplePhoto);
        setImagesArray(res.data?.presentationData?.imagesArray);
        setLetterContent(res.data?.presentationData?.letterContent);
        setMusicLink(res.data?.presentationData?.musicLink);
        setClientPhone(res.data?.presentationData?.clientPhone);
        setEmail(res.data?.presentationData?.email);
        setClientConfigName(res.data?.presentationData?.clientConfigName);
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
        overflowY: "scroll",
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
              <img
                src="/LOGO_02.png"
                alt=""
                style={{ height: "100px" }}
                className="pulse"
              />
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
            <>
              <PresentationPreviewModal
                userName={userName}
                loveName={loveName}
                day={day}
                month={month}
                year={year}
                couplePhoto={couplePhoto}
                imagesArray={imagesArray}
                descriptionsArray={descriptionsArray}
                letterContent={letterContent}
              />

              <div className=" d-flex align-items-center justify-content-center fadeItem pages">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 d-flex justify-content-center my-3">
                        <img src="/LOGO_01.png" alt="" style={{ height: "50px" }} />
                    </div>
                
                  <div className="col-12 col-lg-5">
                    <div
                      className=" carousel slide row "
                      data-bs-touch="false"
                      data-bs-interval="false"
                      id="newPresentationCarousel"
                    >
                      <div className="carousel-inner ">
                        <div className="carousel-item active">
                          <Config_001
                            clientConfigName={clientConfigName}
                            clientPhone={clientPhone}
                            email={email}
                            setClientConfigName={setClientConfigName}
                            setClientPhone={setClientPhone}
                            setEmail={setEmail}
                          />
                        </div>
                        <div className="carousel-item">
                          <Config_01
                            userName={userName}
                            setUserName={setUserName}
                            loveName={loveName}
                            setLoveName={setLoveName}
                            day={day}
                            setDay={setDay}
                            month={month}
                            setMonth={setMonth}
                            year={year}
                            setYear={setYear}
                            couplePhoto={couplePhoto}
                            setCouplePhoto={setCouplePhoto}
                          />
                        </div>
                        <div className="carousel-item ">
                          <Config_02
                            setImagesArray={setImagesArray}
                            setDescriptionsArray={setDescriptionsArray}
                          />
                        </div>
                        <div className="carousel-item ">
                          <Config_03
                            letterContent={letterContent}
                            setLetterContent={setLetterContent}
                          />
                        </div>
                        <div className="carousel-item ">
                          <Config_031
                            musicLink={musicLink}
                            setMusicLink={setMusicLink}
                          />
                        </div>
                        <div className="carousel-item ">
                          <Config_04_client
                            userName={userName}
                            loveName={loveName}
                            day={day}
                            month={month}
                            year={year}
                            couplePhoto={couplePhoto}
                            imagesArray={imagesArray}
                            letterContent={letterContent}
                            musicLink={musicLink}
                            clientPhone={clientPhone}
                            email={email}
                            clientConfigName={clientConfigName}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      )}
    </div>
  );
}
