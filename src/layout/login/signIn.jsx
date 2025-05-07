import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import axios from "axios";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";




export default function SignIn(props) {

    const { data: session, status } = useSession();
    


    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(false);

    const [loading, setLoading] = useState(false);



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

    const validate = () => {

        setEmailError('')
        setPasswordError('')

        let emailError = '';
        let passwordError = '';

        if (!email) emailError = 'Campo obrigatorio';
        if (!password) passwordError = 'Campo obrigatorio';

        if (emailError || passwordError) {
            setEmailError(emailError)
            setPasswordError(passwordError)
            return false
        } else {
            return true
        }

    }


    const handleSignIn = async () => {

        const isValid = validate()

        if (!isValid) return

        setLoading(true)

        const data = {
            email,
            password
        }

        await axios.post(`/api/login/signIn`, data)
            .then(async (res) => {
                setLoading(false)
                window.location.reload()
            }).catch((err) => {
                console.log(err)
                setLoading(false)
            })

    }


    return (
        <div className="row">
             <div className="col-12 ">
                <p>Entre com:</p>
            </div>
            <div className="col-12 my-3">
                <Button className=" d-flex align-items-center" fullWidth onClick={() => handleGoogleLogin()} >
                    <img src="/ICON-GOOGLE.png" alt="" height={15} className="rounded-circle me-2" />
                    Continuar com o Google
                </Button>
            </div>


            <div className="col-12 my-3">
                <p>Ou entre com o seu e-mail:</p>
            </div>
            <div className="col-12 mb-2">
                <Input
                    type="text"
                    placeholder="Seu e-mail"
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
                <Button variant="primary" fullWidth loading={loading} onClick={() => handleSignIn()}>Entrar</Button>
            </div>
        </div>
    )
}