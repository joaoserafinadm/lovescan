import { useState, useEffect } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { ChevronRight, SquarePlus } from "lucide-react";
import { maskCelular, maskName } from "@/utils/maks";
import { ImageUploadWithEffect } from "./SimpleInstagramEffect";

export default function Config_001(props) {
  const {
    clientConfigName,
    clientPhone,
    email,
    setClientConfigName,
    setClientPhone,
    setEmail,
  } = props;

  return (
    <main className="card border-secondary bg-dark m-2 ">
      <div className="card-body">
        <div className="row d-flex justify-content-center">
          <div className="col-12 d-flex justify-content-start my-3">
            <h2 className="text-c-primary">Bem vindo ao Love Scan 💕</h2>
          </div>
          <div className="col-12 d-flex justify-content-start my-3">
            <p className="">
              Crie uma retrospectiva romântica e emocionante com fotos, momentos
              e uma carta de amor. Gere um link com QR Code e surpreenda quem
              você ama.
            </p>
          </div>
          <div className="col-12 d-flex flex-column justify-content-center align-items-center my-3">
            {/* <div>
              <Button rounded="full" className="my-1" variant="primary">
                Vídeo demonstrativo
              </Button>
            </div> */}
            <div>
              <Link href="https://www.lovescan.app/presentation/683fa0c4b4946be7d53fac54" target="_blank">
              <Button rounded="full" className="my-1">
                Apresentação demonstrativa
              </Button>
              </Link>
            </div>
          </div>

          <div className="col-12 d-flex justify-content-start mt-3">
            <p className="">
              Para continuar, precisamos das seguintes informações:
            </p>
          </div>
          <div className="col-12  my-2">
            <Input
              type="text"
              placeholder="Seu nome"
              name="clientConfigName"
              id="clientConfigName"
              variant="default"
              size="md"
              fullWidth
              label="Seu nome completo *"
              value={clientConfigName}
              onChange={(e) => setClientConfigName(e.target.value)}
            />
          </div>

          <div className="col-12  my-2">
            <Input
              type="text"
              placeholder="(00) 00000-0000"
              name="celular"
              id="celular"
              variant="default"
              size="md"
              fullWidth
              label="Seu celular para contato *"
              value={clientPhone}
              onChange={(e) => setClientPhone(maskCelular(e.target.value))}
            />
          </div>
          <div className="col-12  my-2">
            <Input
              type="text"
              placeholder="Digite seu melhor e-mail"
              name="luvFirstName"
              id="luvFirstName"
              variant="default"
              size="md"
              fullWidth
              label="Seu e-mail"
              value={email}
              onChange={(e) => setEmail(maskName(e.target.value))}
            />
            <small>O QR Code será enviado neste e-mail</small>
          </div>

          <div className="col-12 d-flex justify-content-end mt-5">
            <Button
              outline
              data-bs-target="#newPresentationCarousel"
              data-bs-slide="next"
              disabled={clientConfigName === "" || clientPhone === ""}
            >
              Próximo <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
