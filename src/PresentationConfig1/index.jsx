import { useState } from "react";
import Config_01 from "./Config_01";
import Config_02 from "./Config_02";
import FirstSlide from "./FirstSlide";



export default function PresentationConfig1() {

    const [userName, setUserName] = useState('');
    const [loveName, setLoveName] = useState('');

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');


    return (
        <div className=" d-flex align-items-center justify-content-center " >
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-5">

                    <div className=" carousel slide  " data-bs-touch="false" data-bs-interval='false' id="presentationConfig1Carousel">
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
                                />
                            </div>
                            <div className="carousel-item ">
                                <Config_02 />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}