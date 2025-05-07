import { useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { signIn, signOut, useSession } from 'next-auth/react'
import { closeModal } from "@/utils/modalControl";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'
import axios from "axios";
import Input from "@/src/components/Input";
import Button from "@/src/components/Button";



export default function SignUp() {

    const token = jwt.decode(Cookie.get('auth'))


    const { data: session, status } = useSession();

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [notRobot, setNotRobot] = useState(false);

    const [userNameError, setUserNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    const [forceUpdate, setForceUpdate] = useState(0);


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

    const validate = () => {

        setUserNameError('')
        setEmailError('')
        setPasswordError('')
        setConfirmPasswordError('')

        let userNameError = '';
        let emailError = '';
        let passwordError = '';
        let confirmPasswordError = '';

        if (!userName) userNameError = 'Campo obrigatorio';
        if (!email) emailError = 'Campo obrigatorio';
        if (!password) passwordError = 'Campo obrigatorio';
        if (!confirmPassword) confirmPasswordError = 'Campo obrigatorio';
        if (password !== confirmPassword) confirmPasswordError = 'Senhas diferentes'

        if (userNameError || emailError || passwordError || confirmPasswordError ) {
            setUserNameError(userNameError)
            setEmailError(emailError)
            setPasswordError(passwordError)
            setConfirmPasswordError(confirmPasswordError)
            return false
        } else {
            return true
        }

    }



    const handleSignUp = async () => {

        
        const isValid = validate()
        
        if (!isValid) return
        setLoading(true)

        const data = {
            userName,
            email,
            password
        }

        await axios.post(`/api/login/signUp`, data)
            .then(async (res) => {

                setLoading(false)
                window.location.reload()

            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })






    }


    useEffect(() => {

        if (session) {
            handleGoogleSignUp(session)
        }

    }, [session])


    const handleGoogleSignUp = async (session) => {


        await axios.post(`/api/login/socialSignUp`, { user: session.user })
            .then(async (res) => {

                await signOut({ redirect: false })
                window.location.reload()
            }).catch((err) => {
                console.log(err)
            })


    }



    return (
        <div class="row">
            <div className="col-12">
                <p>Cadastre-se com: {session?.user?.name}</p>
            </div>
            <div className="col-12">
                <Button className=" d-flex align-items-center" fullWidth onClick={() => handleGoogleLogin()} >
                    <img src="/ICON-GOOGLE.png" alt="" height={15} className="rounded-circle me-2" />
                    Continuar com o Google
                </Button>
            </div>
            <div className="col-12 mt-5">
                <p>Ou cadastre-se com seu e-mail</p>
            </div>
            <div className="col-12 my-2">
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
                    error={userNameError}
                    helperText={userNameError}
                />
            </div>
            <div className="col-12 my-2">
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
                    error={emailError}
                    helperText={emailError}
                />
            </div>
            <div className="col-12 my-2">
                <Input
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Digite sua senha"
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
                    error={passwordError}
                    helperText={passwordError}
                />
            </div>
            <div className="col-12 my-2">
                <Input
                    type={passwordConfirmVisible ? "text" : "password"}
                    placeholder="Digite sua senha novamente"
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
                    error={confirmPasswordError}
                    helperText={confirmPasswordError}
                />
            </div>
            <div className="col-12 my-2">
                <Button variant="primary" loading={loading} fullWidth onClick={() => handleSignUp()}>Cadastrar</Button>
            </div>
        </div>
    )
}