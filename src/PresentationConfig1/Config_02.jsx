import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { ChevronLeft, ChevronRight, SquarePlus } from "lucide-react";
import { maskName } from "@/utils/maks";
import PhotoSelectModal from "./PhotoSelectModal";
import ImageSelect, { ImageUploadWithEffect } from "./SimpleInstagramEffect";

export default function Config_02(props) {
  const { setImagesArray, setDescriptionsArray } = props;

  // Inicializar com objetos que já têm a estrutura correta
  const initialImagesArray = Array.from({ length: 4 }, (_, index) => ({
    image: null,
    description: ""
  }));

  const [images, setImages] = useState(initialImagesArray);
  const [descriptions, setDescriptions] = useState(
    Array.from({ length: 4 }, (_, index) => "")
  );

  const handleSetImages = (image, index) => {
    const newImages = [...images];
    // Manter a estrutura do objeto, apenas atualizando a imagem
    newImages[index] = {
      ...newImages[index], // preserva description se já existir
      image: image,
    };

    setImages(newImages);
  };

  const handleDescription = (description, index) => {
    const newImages = [...images];
    // Garantir que o objeto existe antes de adicionar a description
    if (newImages[index]) {
      newImages[index] = {
        ...newImages[index], // preserva image se já existir
        description: description
      };
    } else {
      // Se por algum motivo o objeto não existir, criar um novo
      newImages[index] = {
        image: null,
        description: description
      };
    }

    setImages(newImages);

    // Atualizar também o array de descriptions separado se necessário
    const newDescriptions = [...descriptions];
    newDescriptions[index] = description;
    setDescriptions(newDescriptions);
  };

  useEffect(() => {
    setImagesArray(images);
  }, [images]);

  useEffect(() => {
    setDescriptionsArray(descriptions);
  }, [descriptions]);

  return (
    <>
      {/* <PhotoSelectModal /> */}

      <main className="card border-secondary bg-dark m-2 ">
        <div className="card-body">
          <div className="row d-flex justify-content-center">
            <div className="col-12 d-flex justify-content-start  my-3">
              <h2 className="text-c-primary">
                Adicione momentos inesquecíveis registrados em fotos 🖼️
              </h2>
            </div>
            <div className="col-12 d-flex justify-content-start  my-3">
              <p className="">
                Selecione até 4 fotos que representem momentos marcantes na vida
                de vocês.
              </p>
            </div>
            <div className="col-12">
              <div className="row d-flex">
                <div className="col-6 my-2 ">
                  <span className="small">1ª</span>
                  {/* <ImageSelect/> */}
                  <ImageUploadWithEffect
                    onChange={(value) => handleSetImages(value, 0)}
                    handleDescription={(value) => handleDescription(value, 0)}
                  >
                    <Button size="xl" outline fullWidth className="p-5">
                      <SquarePlus className="text-c-secondary" /> <br />
                      <span className="text-c-secondary small">Adicionar</span>
                    </Button>
                    <span className="text-c-secondary" style={{ fontSize: "10px" }}>Limite de tamanho: 10MB</span>
                  </ImageUploadWithEffect>
                </div>
                <div className="col-6 my-2 ">
                  <span className="small">2ª</span>
                  {/* <ImageSelect/> */}
                  <ImageUploadWithEffect
                    onChange={(value) => handleSetImages(value, 1)}
                    handleDescription={(value) => handleDescription(value, 1)}
                  >
                    <Button size="xl" outline fullWidth className="p-5">
                      <SquarePlus className="text-c-secondary" /> <br />
                      <span className="text-c-secondary small">Adicionar</span>
                    </Button>
                    <span className="text-c-secondary" style={{ fontSize: "10px" }}>Limite de tamanho: 10MB</span>

                  </ImageUploadWithEffect>
                </div>
                <div className="col-6 my-2 ">
                  <span className="small">3ª</span>
                  {/* <ImageSelect/> */}
                  <ImageUploadWithEffect
                    onChange={(value) => handleSetImages(value, 2)}
                    handleDescription={(value) => handleDescription(value, 2)}
                  >
                    <Button size="xl" outline fullWidth className="p-5">
                      <SquarePlus className="text-c-secondary" /> <br />
                      <span className="text-c-secondary small">Adicionar</span>
                    </Button>
                    <span className="text-c-secondary" style={{ fontSize: "10px" }}>Limite de tamanho: 10MB</span>

                  </ImageUploadWithEffect>
                </div>
                <div className="col-6 my-2 ">
                  <span className="small">4ª</span>
                  {/* <ImageSelect/> */}
                  <ImageUploadWithEffect
                    onChange={(value) => handleSetImages(value, 3)}
                    handleDescription={(value) => handleDescription(value, 3)}
                  >
                    <Button size="xl" outline fullWidth className="p-5">
                      <SquarePlus className="text-c-secondary" /> <br />
                      <span className="text-c-secondary small">Adicionar</span>
                    </Button>
                    <span className="text-c-secondary" style={{ fontSize: "10px" }}>Limite de tamanho: 10MB</span>

                  </ImageUploadWithEffect>
                </div>
              </div>
            </div>

            <div className="col-12 d-flex justify-content-between mt-5">
              <Button
                outline
                variant="ghost"
                data-bs-target="#newPresentationCarousel"
                data-bs-slide-to={0}
              >
                <ChevronLeft /> Voltar
              </Button>
              <Button
                outline
                data-bs-target="#newPresentationCarousel"
                data-bs-slide-to={2}
              >
                Próximo <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}