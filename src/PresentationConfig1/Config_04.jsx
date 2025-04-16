import { ChevronLeft } from "lucide-react";
import Button from "../components/Button";
import PresentationExample from "../Presentation";





export default function Config_04() {



    return (
        <main className="card border-secondary bg-dark m-2 ">
            <div className="card-body">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 d-flex justify-content-start my-3">
                        <h2 className="text-c-primary">Tudo pronto! ❤️</h2>
                    </div>
                    <div className="col-12 d-flex flex-column justify-content-start mt-3">
                        <p>Sua apresentação está pronta! Sigua os próximos passos para liberar o seu QR Code</p>
                        <p>Gostaria de visualizar sua apresentação?</p>
                    </div>
                    <div className="col-12 d-flex justify-content-center my-3">
                        <Button size="lg" rounded="full" className="mx-1">
                            Abrir apresentação
                        </Button>
                    </div>
                    <div className="col-12 d-flex justify-content-start mt-3">
                        <p>Para continuar, cadastre-se na nossa plataforma.</p>
                    </div>
                    <div className="col-12 d-flex justify-content-center mt-3">
                        <Button size="lg" rounded="full" variant="primary" className="mx-1">
                            Cadastre-se
                        </Button>

                    </div>
                    {/* <div className="col-12 d-flex justify-content-center my-3">
                        <img src="/LOGO_01.png" alt="" height={50} />

                    </div> */}

                    <div className="col-12 d-flex justify-content-start mt-3">
                        <Button
                            outline
                            variant="ghost"
                            data-bs-target="#presentationConfig1Carousel"
                            data-bs-slide-to={3}
                        >
                            <ChevronLeft /> Voltar
                        </Button>
                       
                    </div>
                    <div className="col-12">
                        <PresentationExample/>
                    </div>
                </div>
            </div>

        </main>
    )
}