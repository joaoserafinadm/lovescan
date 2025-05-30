import { User } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";
import { useAuth } from "../layout/context/AuthContext";
import { useState } from "react";
import axios from "axios";
import { maskCelular } from "@/utils/maks";

export default function FormSendModal() {
  const { user } = useAuth();

  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [loadingSave, setLoadingSave] = useState(false);
  const [sendButton, setSendButton] = useState(false);
  const [clientId, setClientId] = useState("");

  const handleSave = async () => {
    setLoadingSave(true);
    const data = {
      user_id: user._id,
      clientName,
      clientPhone,
    };

    await axios
      .post(`/api/indexPage/myClients`, data)
      .then((res) => {
        setClientId(res.data.presentation_id);
        setSendButton(true);
        setLoadingSave(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingSave(false);
      });
  };

  const handleSendForm = async () => {
    const link = `https://www.lovescan.app/clientForm/${clientId}`;

    // Criar a mensagem para o WhatsApp
    const message = `Olá! Aqui está o link do formulário: ${link}`;

    // Codificar a mensagem para URL
    const encodedMessage = encodeURIComponent(message);

    // Criar a URL do WhatsApp
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;

    // Abrir o WhatsApp
    window.open(whatsappUrl, "_blank");
  };


  const handleClose = () => {
    setClientName('')
    setClientPhone('')
    setLoadingSave(false)
    setSendButton(false)
    setClientId('')
  }

  return (
    <div
      class="modal fade"
      id="formSendModal"
      tabindex="-1"
      aria-labelledby="formSendModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content bg-dark">
          <div class="modal-header border-0">
            <h5 class="modal-title">Enviar formulário</h5>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          {!sendButton ? (
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <Input
                    label="Nome do cliente *"
                    type="text"
                    fullWidth
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Digite o nome"
                    prefix={<User size={18} />}
                  />
                  <small>
                    De preferência, digite o nome completo do cliente para
                    facilitar a identificação após o preenchimento do
                    formulário.
                  </small>
                </div>
                <div className="col-12 mt-3">
                  <Input
                    label="Telefone do cliente (opcional)"
                    type="text"
                    fullWidth
                    value={clientPhone}
                    onChange={(e) =>
                      setClientPhone(maskCelular(e.target.value))
                    }
                    placeholder="Digite o telefone"
                    prefix={<User size={18} />}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="modal-body fadeItem">
              <div className="row">
                <div className="col-12">
                  <p>
                    Formulário de <b>{clientName}</b> pronto para envio!
                  </p>
                </div>
              </div>
              <small>
                Clique em "Enviar formulário" para enviar pelo WhatsApp, copie o
                link abaixo e envie manualmente
              </small>
              <div className="row mt-3">
                <div className="col-12 text-center">
                  <p className="">https://www.lovescan.app/clientForm/{clientId}</p>
                </div>
              </div>
            </div>
          )}

          <div className="modal-footer">
            {sendButton ? (
              <>
                <Button variant="secondary" data-bs-dismiss="modal" onClick={handleClose}>Fechar</Button>
                <Button
                  variant="primary"
                  disabled={!clientName}
                  loading={loadingSave}
                  onClick={handleSendForm}
                >
                  Enviar formulário
                </Button>
              </>
            ) : (
              <>
                <Button variant="secondary" data-bs-dismiss="modal" onClick={handleClose}>Cancelar</Button>

                <Button
                  variant="primary"
                  disabled={!clientName}
                  loading={loadingSave}
                  onClick={handleSave}
                >
                  Salvar
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
