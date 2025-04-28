import { useEffect, useState } from "react";
import Input from "../components/Input";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import Button from "../components/Button";
import { signIn, signOut, useSession } from 'next-auth/react'
import { closeModal } from "@/utils/modalControl";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'



export default function SignUpModal() {

        const token = jwt.decode(Cookie.get('auth'))
    

    const { data: session, status } = useSession();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notRobot, setNotRobot] = useState(false);

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);


    const handleGoogleLogin = () => {
        const width = 500
        const height = 600
        const left = window.innerWidth / 2 - width / 2
        const top = window.innerHeight / 2 - height / 2

        const loginWindow = window.open(
            '/api/auth/signin/google?prompt=select_account&callbackUrl=/auth/popup-close',
            'GoogleLogin',
            `width=${width},height=${height},top=${top},left=${left}`
        )

        // Monitorar o fechamento da janela
        const interval = setInterval(() => {
            if (loginWindow?.closed) {
                clearInterval(interval) // ou use Router para atualizar dados
            }
        }, 1000)
    }


    useEffect(() => {
        console.log("Status da sessão:", status);
        console.log("Detalhes da sessão:", session);
        if (session?.user) {
            console.log("Usuário autenticado:", session.user);
            // closeModal();
        }
    }, [session, status]);


    return (
        <div class="modal fade" id="signUpPresentationModal" tabindex="-1" aria-labelledby="signUpPresentationModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content bg-dark">
                    <div class="modal-header border-0">
                        <img src="/LOGO_01.png" alt="" height={40} />

                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    {session ?
                        <div class="modal-body">
                            <div className="col-12">
                                <p>Bem vindo {session?.user?.name}</p>
                            </div>
                            <div className="col-12 my-3">
                                <Button variant="primary" fullWidth data-bs-dismiss="modal">Continuar</Button>
                            </div>
                        </div>
                        :
                        <div class="modal-body">
                            <div className="col-12">
                                <p>Cadastre-se com: {session?.user?.name}</p>
                            </div>
                            <div className="col-12">
                                <Button className="mx-1 d-flex align-items-center" fullWidth onClick={() => handleGoogleLogin()} >
                                    <img src="/ICON-GOOGLE.png" alt="" height={15} className="rounded-circle me-2" />
                                    Continuar com o Google
                                </Button>
                            </div>
                            <div className="col-12 mt-5">
                                <p>Ou cadastre-se com seu e-mail</p>
                            </div>
                            <div className="col-12 my-3">
                                <Input
                                    type="text"
                                    placeholder="Informe seu nome completo"
                                    name="userName"
                                    id="userName"
                                    variant="default"
                                    size="md"
                                    fullWidth
                                    label="Seu nome"
                                    value={userName}
                                    prefix={<User size={18} />}
                                    onChange={e => setUserName(e.target.value)}
                                />
                            </div>
                            <div className="col-12 my-3">
                                <Input
                                    type="text"
                                    placeholder="Informe seu principal e-mail"
                                    name="emailInput"
                                    id="emailInput"
                                    variant="default"
                                    size="md"
                                    fullWidth
                                    label="E-mail"
                                    value={email}
                                    prefix={<Mail size={18} />}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="col-12 my-3">
                                <Input
                                    type={passwordVisible ? "text" : "password"}
                                    placeholder="Digite o nome do seu amor"
                                    name="passwordInput"
                                    id="passwordInput"
                                    variant="default"
                                    size="md"
                                    fullWidth
                                    label="Senha"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    prefix={<Lock size={18} />}
                                    suffix={
                                        passwordVisible ?
                                            <EyeOff size={18} onClick={() => setPasswordVisible(false)} style={{ cursor: 'pointer' }} /> :
                                            <Eye size={18} onClick={() => setPasswordVisible(true)} style={{ cursor: 'pointer' }} />
                                    }
                                />
                            </div>
                            <div className="col-12 my-3">
                                <Input
                                    type={passwordConfirmVisible ? "text" : "password"}
                                    placeholder="Digite o nome do seu amor"
                                    name="confirmPasswordInput"
                                    id="confirmPasswordInput"
                                    variant="default"
                                    size="md"
                                    fullWidth
                                    prefix={<Lock size={18} />}
                                    suffix={
                                        passwordConfirmVisible ?
                                            <EyeOff size={18} onClick={() => setPasswordConfirmVisible(false)} style={{ cursor: 'pointer' }} /> :
                                            <Eye size={18} onClick={() => setPasswordConfirmVisible(true)} style={{ cursor: 'pointer' }} />
                                    }
                                    label="Confirmar a senha"
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <div className="col-12 my-3">
                                <Button variant="primary" fullWidth onClick={() => handleSignUp()}>Cadastrar</Button>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}