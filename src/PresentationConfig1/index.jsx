import { useState } from "react";
import Config_01 from "./Config_01";
import Config_02 from "./Config_02";
import FirstSlide from "./FirstSlide";
import Config_03 from "./Config_03";
import Config_04 from "./Config_04";
import PresentationPreviewModal from "./PresentationPreviewModal";
import SignUpModal from "./SignUpModal";



export default function PresentationConfig1() {

    const [userName, setUserName] = useState('');
    const [loveName, setLoveName] = useState('');

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const [couplePhoto, setCouplePhoto] = useState('');

    const [imagesArray, setImagesArray] = useState([]);
    const [descriptionsArray, setDescriptionsArray] = useState([]);

    const [letterContent, setLetterContent] = useState('');


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
            letterContent={letterContent}/>
            <SignUpModal />
            <div className=" d-flex align-items-center justify-content-center " >
                <div className="row d-flex justify-content-center">
                    <div className="col-12 col-lg-5">
                        <div className=" carousel slide row " data-bs-touch="false" data-bs-interval='false' id="presentationConfig1Carousel">
                            <div className="carousel-inner ">
                                <div className="carousel-item active">
                                    <FirstSlide />
                                </div>
                                <div className="carousel-item ">
                                    <Config_01
                                        userName={userName} setUserName={setUserName}
                                        loveName={loveName} setLoveName={setLoveName}
                                        day={day} setDay={setDay}
                                        month={month} setMonth={setMonth}
                                        year={year} setYear={setYear}
                                        couplePhoto={couplePhoto}
                                        setCouplePhoto={setCouplePhoto}
                                    />
                                </div>
                                <div className="carousel-item ">
                                    <Config_02 setImagesArray={setImagesArray}
                                        setDescriptionsArray={setDescriptionsArray} />
                                </div>
                                <div className="carousel-item ">
                                    <Config_03
                                        letterContent={letterContent}
                                        setLetterContent={setLetterContent} />
                                </div>
                                <div className="carousel-item ">
                                    <Config_04
                                        userName={userName}
                                        loveName={loveName}
                                        day={day}
                                        month={month}
                                        year={year}
                                        imagesArray={imagesArray}
                                        descriptionsArray={descriptionsArray}
                                        letterContent={letterContent}
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