import PresentationExample from "../Presentation";




export default function PresentationPreviewModal(props) {

    const { userName,
        loveName,
        day,
        month,
        year,
        couplePhoto,
        imagesArray,
        descriptionsArray,
        letterContent } = props

    return (
        <div class="modal fade" id="presentationPreviewModal" tabindex="-1" aria-labelledby="presentationPreviewModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content bg-dark">
                    <div class="modal-header border-0">
                        <h5 class="modal-title" id="presentationPreviewModalLabel">Sua apresentação</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <PresentationExample
                            userName={userName}
                            loveName={loveName}
                            day={day}
                            month={month}
                            year={year}
                            couplePhoto={couplePhoto}
                            imagesArray={imagesArray}
                            descriptionsArray={descriptionsArray}
                            letterContent={letterContent} />

                    </div>

                </div>
            </div>
        </div>
    )


}