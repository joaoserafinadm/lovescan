import React, { useState } from "react";
import Button from "../components/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Config_03(props) {
  const {letterContent, setLetterContent} = props

  return (
    <>
      <main className="card border-secondary bg-dark m-2">
        <div className="card-body">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-start my-3">
              <h2 className="text-c-primary">Escreva uma carta de amor 💌</h2>
            </div>
            <div className="col-12 d-flex justify-content-start my-3">
              <p className="">
                Faça uma declaração para o seu amor que ficará salva para sempre!
              </p>
            </div>

            {/* Área de texto para escrever a carta */}
            <div className="col-12 mb-4">
              <textarea
                className="form-control bg-dark text-light border-secondary"
                rows="4"
                placeholder="Escreva sua mensagem de amor aqui..."
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
              ></textarea>
            </div>

            {/* Visualização da carta em papel */}
            {letterContent && (
              <div className="col-12 mb-4">
                <div 
                  className="p-4 mx-auto" 
                  style={{
                    maxWidth: "600px",
                    minHeight: "300px",
                    background: "#f8f5e6",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    borderRadius: "2px",
                    position: "relative",
                    fontFamily: "'Indie Flower', cursive",
                    fontSize: "1.4rem",
                    lineHeight: "1.5",
                    backgroundImage: "linear-gradient(#f8f5e6 0px, #f8f5e6 30px, #ccc 30px, #ccc 31px, #f8f5e6 31px)",
                    backgroundSize: "100% 32px",
                    paddingTop: "31px"
                  }}
                >
                  {/* Estilize o texto aqui - com cor cinza escuro e quebras de linha */}
                  <div style={{ marginTop: 0, color: "#444444" }}>
                    {letterContent.split('\n').map((text, index) => (
                      <p key={index} style={{ marginBottom: "8px" }}>{text}</p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="col-12 d-flex justify-content-between mt-5">
              <Button
                outline
                variant="ghost"
                data-bs-target="#presentationConfig1Carousel"
                data-bs-slide-to={2}
              >
                <ChevronLeft /> Voltar
              </Button>
              <Button
                outline
                data-bs-target="#presentationConfig1Carousel"
                data-bs-slide-to={4}
              >
                Próximo <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Link para fontes manuscritas do Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"
        rel="stylesheet"
      />
    </>
  );
}