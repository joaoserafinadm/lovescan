import PresentationExample from "../Presentation";
import Presentation01 from "../Presentation01";




export default function PresentationPreviewModal(props) {

    const { userName,
        loveName,
        day,
        month,
        year,
        couplePhoto,
        imagesArray,
        descriptionsArray,
        letterContent,
        musicLink } = props

    return (
        <div class="modal fade" id="presentationPreviewModal" tabindex="-1" aria-labelledby="presentationPreviewModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content bg-dark">
                    <div class="modal-header border-0">
                        <h5 class="modal-title" id="presentationPreviewModalLabel">Sua apresentação</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <Presentation01
                            userName={userName}
                            loveName={loveName}
                            day={day}
                            month={month}
                            year={year}
                            couplePhoto={couplePhoto}
                            imagesArray={imagesArray}
                            descriptionsArray={descriptionsArray}
                            letterContent={letterContent}
                            musicLink={musicLink} />

                    </div>

                </div>
            </div>
        </div>
    )


}