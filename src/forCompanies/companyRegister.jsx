import { useEffect, useState } from "react";
import Input from "../components/Input";
import { maskCelular, maskCnpj, maskName } from "@/utils/maks";
import Button from "../components/Button";
import axios from "axios";
import { useAuth } from "../layout/context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";

export default function CompanyRegister() {
  const { user } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);

  const [companyNameError, setCompanyNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [showCreditsBtn, setShowCreditsBtn] = useState(false);

  useEffect(() => {
    if (user) {
      dataFunction();
    }
  }, [user]);

  const dataFunction = async () => {
    await axios
      .get(`/api/companies`, { params: { user_id: user._id } })
      .then((res) => {
        if (res.data.companyData) {
          setShowCreditsBtn(true);
          setCompanyName(res.data.companyData.companyName);
          setPhone(res.data.companyData.phone);
          setEmail(res.data.companyData.email);
        }
    })
    .catch((err) => {
          setShowCreditsBtn(false);
        console.log(err);
      });
  };

  const validate = () => {
    let companyNameError = "";
    let phoneError = "";
    let emailError = "";

    if (!companyName) companyNameError = "Campo obrigatorio";
    if (!phone) phoneError = "Campo obrigatorio";
    if (!email) emailError = "Campo obrigatorio";

    if (companyNameError || phoneError || emailError) {
      setCompanyNameError(companyNameError);
      setPhoneError(phoneError);
      setEmailError(emailError);
      return false;
    } else {
      return true;
    }
  };

  const handleSave = async () => {
    setLoadingSave(true);

    const isValid = validate();

    if (!isValid) {
      setLoadingSave(false);
      return;
    }

    const data = {
      user_id: user._id,
      companyName,
      phone,
      email,
    };

    await axios.post(`/api/companies`, data).then(
      (res) => {
        setLoadingSave(false);
        toast.success(`Os dados foram salvos com sucesso!`);
        setShowCreditsBtn(true);
        console.log(res);
      },
      (err) => {
        setLoadingSave(false);
        console.log(err);
      }
    );
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnBottom
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ top: "75px" }}
        // className={style.toastContainer}
      />

      <div className="col-12 col-md-4 my-2">
        <Input
          label="Empresa *"
          fullWidth
          error={companyNameError}
          helperText={companyNameError}
          placeholder="Nome da empresa"
          onChange={(e) => setCompanyName(e.target.value)}
          value={companyName}
        />
      </div>
      <div className="col-12 col-md-4 my-2">
        <Input
          label="Email *"
          fullWidth
          placeholder="E-mail para contato"
          error={emailError}
          helperText={emailError}
          onChange={(e) => setEmail(maskName(e.target.value))}
          value={email}
        />
      </div>
      <div className="col-12 col-md-4 my-2">
        <Input
          label="Contato *"
          fullWidth
          error={phoneError}
          helperText={phoneError}
          placeholder="Telefone ou celular da empresa"
          onChange={(e) => setPhone(maskCelular(e.target.value))}
          value={phone}
        />
      </div>
      <hr />
      <div className="col-12 d-flex justify-content-end">
        <Button
          variant="success"
          onClick={() => handleSave()}
          loading={loadingSave}
        >
          Salvar
        </Button>
        {showCreditsBtn && (
          <Link href="/credits">
            <Button
              className="ms-2 fadeItem pulse"
              variant="outline-success"
            >
              Planos de créditos
            </Button>
          </Link>
        )}
      </div>
    </>
  );
}
