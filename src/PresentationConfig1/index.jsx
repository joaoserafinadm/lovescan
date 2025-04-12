import Config_01 from "./Config_01";
import FirstSlide from "./FirstSlide";



export default function PresentationConfig1() {
    return (
        <div className=" d-flex align-items-center justify-content-center " style={{ height: "90vh", width: "100%" }}>
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-lg-5">

                    <div className=" carousel slide  " data-bs-touch="false" data-bs-interval='false' id="presentationConfig1Carousel">
                        <div className="carousel-inner ">
                            <div className="carousel-item active">
                                <FirstSlide />
                            </div>
                            <div className="carousel-item ">
                                <Config_01 />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}