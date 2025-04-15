import { useEffect, useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { ChevronLeft, ChevronRight, SquarePlus } from "lucide-react";
import { maskName } from "@/utils/maks";
import PhotoSelectModal from "./PhotoSelectModal";
import ImageSelect, { ImageUploadWithEffect } from "./SimpleInstagramEffect";



export default function Config_02(props) {

    const { setImagesArray, setDescriptionsArray } = props

    const imagesArray = Array.from({ length: 4 }, (_, index) => null);


    const [images, setImages] = useState(imagesArray);
    const [descriptions, setDescriptions] = useState(Array.from({ length: 4 }, (_, index) => ""));

    const handleSetImages = (image, index) => {

        const newImages = [...images];
        newImages[index] = image;

        setImages(newImages);

    }

    const handleDescription = (description, index) => {
        const newDescriptions = [...descriptions];
        newDescriptions[index] = description;
        setDescriptions(newDescriptions);
    }

    useEffect(() => {

        setImagesArray(images)

    }, [images])

    useEffect(() => {

        setDescriptionsArray(images)

    }, [descriptions])







    return (
        <>
            {/* <PhotoSelectModal /> */}

            <main className="card border-secondary bg-dark m-2 ">
                <div className="card-body">

                    <div className="row d-flex justify-content-center">

                        <div className="col-12 d-flex justify-content-start  my-3">
                            <h2 className="text-c-primary">Adicione momentos inesquecíveis registrados em fotos</h2>
                        </div>
                        <div className="col-12 d-flex justify-content-start  my-3">
                            <p className="">Selecione até 4 fotos que representem momentos marcantes na vida de vocês.</p>
                        </div>
                        <div className="col-12">
                            <div className="row d-flex">
                                <div className="col-6 my-2 ">
                                    <span className="small">1ª</span>
                                    {/* <ImageSelect/> */}
                                    <ImageUploadWithEffect
                                        onChange={(value) => handleSetImages(value, 0)}
                                        handleDescription={(value) => handleDescription(value, 0)}>
                                        <Button size="xl" outline fullWidth className="p-5">
                                            <SquarePlus className="text-c-secondary" /> <br />
                                            <span className="text-c-secondary small">Adicionar</span>
                                        </Button>
                                    </ImageUploadWithEffect>

                                </div>
                                <div className="col-6 my-2 ">
                                    <span className="small">2ª</span>
                                    {/* <ImageSelect/> */}
                                    <ImageUploadWithEffect
                                        onChange={(value) => handleSetImages(value, 1)}
                                        handleDescription={(value) => handleDescription(value, 0)}>
                                        <Button size="xl" outline fullWidth className="p-5">
                                            <SquarePlus className="text-c-secondary" /> <br />
                                            <span className="text-c-secondary small">Adicionar</span>
                                        </Button>
                                    </ImageUploadWithEffect>
                                </div>
                                <div className="col-6 my-2 ">
                                    <span className="small">3ª</span>
                                    {/* <ImageSelect/> */}
                                    <ImageUploadWithEffect
                                        onChange={(value) => handleSetImages(value, 2)}
                                        handleDescription={(value) => handleDescription(value, 0)}>
                                        <Button size="xl" outline fullWidth className="p-5">
                                            <SquarePlus className="text-c-secondary" /> <br />
                                            <span className="text-c-secondary small">Adicionar</span>
                                        </Button>
                                    </ImageUploadWithEffect>
                                </div>
                                <div className="col-6 my-2 ">
                                    <span className="small">4ª</span>
                                    {/* <ImageSelect/> */}
                                    <ImageUploadWithEffect
                                        onChange={(value) => handleSetImages(value, 3)}
                                        handleDescription={(value) => handleDescription(value, 0)}>
                                        <Button size="xl" outline fullWidth className="p-5">
                                            <SquarePlus className="text-c-secondary" /> <br />
                                            <span className="text-c-secondary small">Adicionar</span>
                                        </Button>
                                    </ImageUploadWithEffect>
                                </div>

                            </div>
                        </div>


                        <div className="col-12 d-flex justify-content-between mt-5">
                            <Button outline variant="ghost" data-bs-target="#presentationConfig1Carousel" data-bs-slide-to={1} >
                                <ChevronLeft /> Voltar
                            </Button>
                            <Button outline data-bs-target="#presentationConfig1Carousel" data-bs-slide-to={3} >
                                Próximo <ChevronRight />
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </>

    )
}