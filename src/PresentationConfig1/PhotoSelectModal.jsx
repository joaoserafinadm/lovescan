import { useState } from "react";
import Button from "../components/Button";
import StyledDropzone from "../components/StyledDropzone";



export default function PhotoSelectModal(props) {

    const [logoImageUrlReview, setLogoImageUrlReview] = useState(null);
    const [companyLogo, setCompanyLogo] = useState(null);


    const handleFileChange = file => {


        if (file) {
            setSelectCompanyFile(URL.createObjectURL(file))
            setTimeout(() => {
                // var modal = document.getElementById('cropperLogoModal')
                // var cropperModal = new bootstrap.Modal(modal)
                // cropperModal.show()
            }, 20)
        } else {
            return
        }
    }





    return (
        <div class="modal fade" id="photoSelectModal" tabindex="-1" aria-labelledby="photoSelectModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark">
                    <div class="modal-header border-0">
                        <h5 class="modal-title" id="photoSelectModalLabel">Adicionar foto</h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <StyledDropzone setFiles={array => { handleFileChange(array[0]) }} img>
                            <div className="row d-flex justify-content-center align-items-center" >

                                <div className="col-12 d-flex justify-content-center align-items-center" >
                                    {logoImageUrlReview ?
                                        <img src={logoImageUrlReview} alt="logo" id="logoItem" className="logoEdit fadeItem" />
                                        :
                                        <>
                                            {companyLogo ?
                                                <img src={companyLogo} alt="logo" id="logoItem" className="logoEdit fadeItem" />
                                                :
                                                <div className="col-12 d-flex justify-content-center align-items-center flex-column py-5 text-center fadeItem  rounded" style={{ border: '1px dashed #ccc' }}>
                                                    <span>
                                                        Clique aqui ou arraste o arquivo
                                                    </span>
                                                    <span className="small">
                                                        Permitido apenas um arquivo. Formato: .PNG, .JPG
                                                    </span>
                                                </div>
                                            }
                                        </>
                                    }
                                </div>
                            </div>
                        </StyledDropzone>
                    </div>
                    <div class="modal-footer border-0">
                        <Button size="sm" variant="secondary" className="mx-1">Cancelar</Button>
                        <Button size="sm" variant="primary" className="mx-1">Adicionar</Button>
                    </div>
                </div>
            </div>
        </div>
    )

}