import { useAuth } from "@/src/layout/context/AuthContext";
import Config_01 from "@/src/PresentationConfig1/Config_01";
import Config_02 from "@/src/PresentationConfig1/Config_02";
import Config_03 from "@/src/PresentationConfig1/Config_03";
import Config_031 from "@/src/PresentationConfig1/Config_031";
import Config_04 from "@/src/PresentationConfig1/Config_04";
import PresentationPreviewModal from "@/src/PresentationConfig1/PresentationPreviewModal";
import SignUpModal from "@/src/PresentationConfig1/SignUpModal";
import axios from "axios";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function newPresentation() {

  const { user } = useAuth();
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

  const [credits, setCredits] = useState('');

  useEffect(() => {
    if (user) dataFunction()
  }, [user])

  const dataFunction = async () => {

    await axios.get(`/api/credits`, { params: { user_id: user._id } }).then((res) => {
      setCredits(res.data.credits);
    }).catch((err) => {
      console.log(err);
    });

  }

  return (
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
          <Link href="/" className="my-2 d-inline-block text-white">
            <span className="d-flex align-items-center">
              <ChevronLeft /> Voltar
            </span>
          </Link>
          <div className="col-12 col-lg-5">
            <div
              className=" carousel slide row "
              data-bs-touch="false"
              data-bs-interval="false"
              id="newPresentationCarousel"
            >
              <div className="carousel-inner ">
                <div className="carousel-item active">
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
                  <Config_04
                    userName={userName}
                    loveName={loveName}
                    day={day}
                    month={month}
                    year={year}
                    couplePhoto={couplePhoto}
                    imagesArray={imagesArray}
                    descriptionsArray={descriptionsArray}
                    letterContent={letterContent}
                    musicLink={musicLink}
                    credits={credits}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
