'use client'

import { ChevronLeft } from "lucide-react";
import Button from "../components/Button";
import PresentationExample from "../Presentation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import { useRouter } from "next/router";




export default function Config_04(props) {

    const { data: session, status } = useSession();

    const router = useRouter();

    const token = jwt.decode(Cookie.get('auth'))

    const [loadingPayment, setLoadingPayment] = useState(false);
    const [product, setProduct] = useState(null);
    const [userId, setUserId] = useState(null);


    const { userName,
        loveName,
        day,
        month,
        year,
        imagesArray,
        descriptionsArray,
        letterContent } = props

    useEffect(() => {

        console.log("session", session)

        if (session) {
            handleGoogleSignUp(session)
        }

    }, [session])


    const handleGoogleSignUp = async (session) => {

        console.log("handleGoogleSignUp", session)

        const data = {
            userName,
            loveName,
            day,
            month,
            year,
            imagesArray,
            descriptionsArray,
            letterContent
        }

        await axios.post(`/api/login/socialSignUp`, { user: session.user, presentationData: data })
            .then(async (res) => {

                console.log("handleGoogleSignUp res", res)
                await signOut({ redirect: false })
            })


    }


    const handlePayment = async () => {
        try {
            setLoadingPayment(true);

            // Criar a preferência no servidor
            const response = await fetch('/api/mercadopago/create-preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: 'credit-1',
                    userId: token?._id, // ID do usuário logado
                }),
            });

            const data = await response.json();

            console.log('Response data:', data, response);

            if (!response.ok) {
                throw new Error(data.error || 'Erro ao processar pagamento');
            }

            // Redirecionar para a página de checkout do Mercado Pago
            const checkoutUrl = `https://www.mercadopago.com.br/checkout/v1/redirect?preference-id=${data.preferenceId}`;
            router.push(checkoutUrl);

        } catch (error) {
            console.error('Erro ao iniciar pagamento:', error);
            alert('Não foi possível iniciar o pagamento. Por favor, tente novamente.');
        } finally {
            setLoadingPayment(false);
        }
    };





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
                        <Button size="lg" rounded="full" className="mx-1" data-bs-toggle="modal" data-bs-target="#presentationPreviewModal" >
                            Abrir apresentação
                        </Button>
                    </div>
                    {token ?
                        <div className="col-12 d-flex justify-content-center my-3">
                            <Button size="lg" rounded="full" className="mx-1"
                                onClick={handlePayment} loading={loadingPayment} >
                                Finalizar compra
                            </Button>
                        </div>
                        :
                        <>
                            <div className="col-12 d-flex justify-content-start mt-3">
                                <p>Para continuar, cadastre-se na nossa plataforma.</p>
                            </div>
                            <div className="col-12 d-flex justify-content-center mt-3">
                                <Button size="lg" rounded="full" variant="primary" className="mx-1" data-bs-toggle="modal" data-bs-target="#signUpPresentationModal">
                                    Cadastre-se
                                </Button>

                            </div>
                        </>
                    }


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
                </div>
            </div>

        </main>
    )
}