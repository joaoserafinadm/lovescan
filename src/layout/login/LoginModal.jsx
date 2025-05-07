import { useState } from "react";
import Sections from "../../components/Sections";
import SignUp from "./signUp";
import SignIn from "./signIn";
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import Button from "@/src/components/Button";




export default function LoginModal(props) {

    const token = jwt.decode(Cookie.get('auth'))

    const [section, setSection] = useState('Cadastrar')



    return (
        <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content bg-dark">
                    <div class="modal-header border-0">
                        <img src="/LOGO_01.png" alt="" height={40} />

                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {token ?
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <p className="">Bem vindo(a) {token.userName}!</p>
                                </div>
                                <div className="col-12">
                                    <Button variant="primary" fullWidth data-bs-dismiss="modal">Continuar</Button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12">
                                    <p className="">Bem vindo ao Love Scan!</p>
                                </div>
                            </div>
                            <div className=" carousel  slide" data-bs-touch="false" data-bs-interval='false' id="LoginCarousel">
                                <Sections
                                    section={section} idTarget="LoginCarousel"
                                    setSection={value => setSection(value)}
                                    sections={["Cadastrar", "Entrar"]} />

                                <div className="carousel-inner ">
                                    <div className="carousel-item active">
                                        <SignUp />
                                    </div>
                                    <div className="carousel-item ">
                                        <SignIn />
                                    </div>
                                </div>
                            </div>
                        </div>

                    }

                </div>
            </div>
        </div>
    )
}