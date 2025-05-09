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

        await axios.post(`/api/login/socialSignUp`, { user: session.user })
            .then(async (res) => {

                await signOut({ redirect: false })
            })


    }


    const handlePayment = async () => {
        try {
            setLoadingPayment(true);
    
            const data = {
                userName,
                loveName,
                day,
                month,
                year,
                imagesArray,
                descriptionsArray,
                letterContent
            };
    
            // Primeiro salva os dados da apresentação
            await axios.post(`/api/presentation`, { 
                user_id: token?._id, 
                presentationData: data 
            });
            
            // Depois cria a preferência de pagamento
            const response = await fetch('/api/mercadopago/create-preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: 'credit-1',
                    userId: token?._id,
                }),
            });
    
            const responseData = await response.json();
    
            if (!response.ok) {
                throw new Error(responseData.error || 'Erro ao processar pagamento');
            }
    
            // Redireciona para o checkout do Mercado Pago
            const checkoutUrl = `https://www.mercadopago.com.br/checkout/v1/redirect?preference-id=${responseData.preferenceId}`;
            router.push(checkoutUrl);
    
        } catch (error) {
            console.error('Erro ao processar pagamento:', error);
            alert(error.message || 'Não foi possível completar a operação. Por favor, tente novamente.');
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
                            data-bs-target="#newPresentationCarousel"
                            data-bs-slide-to={2}
                        >
                            <ChevronLeft /> Voltar
                        </Button>

                    </div>
                </div>
            </div>

        </main>
    )
}