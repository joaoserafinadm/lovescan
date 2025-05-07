import { useEffect } from "react";
import isMobile from "../../../utils/isMobile";
import scrollTo from "../../../utils/scrollTo";
export default function Sections(props) {


    useEffect(() => {

        setTimeout(() => {

            var myCarousel = document.querySelector("#" + props.idTarget)
            var carousel = myCarousel ? new bootstrap.Carousel(myCarousel) : ''
            if (carousel) {
                carousel?.to(props.sections.indexOf(props.section))

            }

        }, 200)
    }, [props.section])

    useEffect(() => {
        const scrollContainer = document.querySelector("#sectionsScrollbar");
        if (scrollContainer) {
            scrollContainer.scrollBy({ left: 1, behavior: "smooth" });
        }
    }, []);

    const scroll = (id) => {

        const element = document.getElementById(id);
        const parentElement = element.parentElement;
        if (element && parentElement) {
            const elementOffsetLeft = element.offsetLeft;
            const parentWidth = parentElement.clientWidth;
            const elementWidth = element.clientWidth;
            const scrollLeft = elementOffsetLeft - (parentWidth / 2) + (elementWidth / 2);
            parentElement.scroll({
                left: scrollLeft,
                behavior: 'smooth'
            });
        }
    }




    return (
        <div className="row  mb-4 mx-2" >
            <div className="col-12 d-flex align-items-end" id="sectionsScrollbar" style={{ overflowX: isMobile() ? "scroll" : 'auto' }}>
                {props.sections.map((elem, index) => {
                    return (
                        <span style={{ minWidth: '150px', width: 'auto' }} key={index} id={elem + index}
                            className={`px-4 py-3 text-center ${isMobile() ? 'fs-small px-4' : ' px-5'} ${props.section === elem ? 'fw-bold text-c-primary  border-bottom border-2 ' : ''}`} type="button"
                            onClick={() => { props.setSection(elem); scroll(elem + index) }} data-bs-target={"#" + props.idTarget} data-bs-slide-to={index}>
                            {elem}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}