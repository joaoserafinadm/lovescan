import Button from "../components/Button";



export default function FirstSlide(props) {


    return (

        <main className="card border-secondary bg-dark m-2 fadeEffect">
            <div className="card-body">

                <div className="row   d-flex justify-content-center">
                    <div className="col-12 d-flex justify-content-center my-3">
                        <img src="/LOGO_01.png" alt="" height={50} />

                    </div>
                    <div className="col-12 d-flex justify-content-start  my-3">
                        <h2 className="text-c-primary">Sua história de amor, do seu jeito ❤️</h2>
                    </div>

                    <div className="col-12 my-2">
                        <p className="">Crie uma retrospectiva romântica e emocionante com fotos, momentos e uma carta de amor. Gere um link com QR Code e surpreenda quem você ama.</p>
                    </div>
                    <div className="col-12 my-2">
                        <p className="text-c-secondary">Primeiro passo você deve selecionar o idioma:</p>
                    </div>
                    <div className="col-12 d-flex justify-content-center     my-2">
                        <Button size="sm" rounded="full" className="mx-1">
                            Português
                        </Button>
                        <Button size="sm" rounded="full" className="mx-1">
                            English
                        </Button>
                        <Button size="sm" rounded="full" className="mx-1">
                            Español
                        </Button>
                    </div>
                    <div className="col-12 my-2">
                        <p className="text-c-secondary">Agora, podemos continuar!</p>
                    </div>
                    <div className="col-12 ">
                        <Button size="xl" variant="primary"  fullWidth data-bs-target="#presentationConfig1Carousel" data-bs-slide-to={1}>
                            Começar agora!
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}