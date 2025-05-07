import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";
import { ChevronRight, SquarePlus } from "lucide-react";
import { maskName } from "@/utils/maks";
import { ImageUploadWithEffect } from "./SimpleInstagramEffect";



export default function Config_01(props) {


    const {
        userName,
        setUserName,
        loveName,
        setLoveName,
        day,
        setDay,
        month,
        setMonth,
        year,
        setYear,
        couplePhoto,
        setCouplePhoto
    } = props

    const days = Array.from({ length: 31 }, (_, index) => index + 1);

    const monthKeys = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    const monthOptions = monthKeys.map((key, index) => ({
        value: String(index + 1).padStart(2, '0'), // Ex: "01", "02", ..., "12"
        label: key,
        //   label: t(`months.${key}`),
    }));

    const years = Array.from({ length: 100 }, (_, index) => 2023 - index);


    return (

        <main className="card border-secondary bg-dark m-2 ">
            <div className="card-body">

                <div className="row   d-flex justify-content-center">

                    <div className="col-12 d-flex justify-content-start  my-3">
                        <h2 className="text-c-primary">Conte-me mais sobre vocês...</h2>
                    </div>

                    <div className="col-12 col-md-6 my-2">
                        <Input
                            type="text"
                            placeholder="Seu primeiro nome"
                            name="firstName"
                            id="firstName"
                            variant="default"
                            size="md"
                            fullWidth
                            label="Seu nome"
                            value={userName}
                            onChange={e => setUserName(maskName(e.target.value))}
                        />
                    </div>
                    <div className="col-12 col-md-6 my-2">
                        <Input
                            type="text"
                            placeholder="Digite o nome do seu amor"
                            name="luvFirstName"
                            id="luvFirstName"
                            variant="default"
                            size="md"
                            fullWidth
                            label="Nome do seu amor"
                            value={loveName}
                            onChange={e => setLoveName(maskName(e.target.value))}
                        />
                    </div>
                    <div className="col-12 mt-5">
                        <p className="">Quando vocês se conheceram?</p>
                    </div>
                    <div className="col-12 d-flex justify-content-center    mb-2">
                        <div className="col-3 px-1">

                            <Select
                                label="Dia"
                                name="namoDay"
                                placeholder="Dia"
                                options={days.map((day) => ({ value: day, label: day }))}
                                value={day}
                                fullWidth
                                onChange={e => setDay(e.target.value)}
                            />
                        </div>
                        <div className="col-6 px-1">

                            <Select
                                label="Mês"
                                name="namoMonth"
                                placeholder="Mês"
                                options={monthOptions}
                                value={month}
                                fullWidth
                                onChange={e => setMonth(e.target.value)}
                            />
                        </div>
                        <div className="col-3 px-1">

                            <Select
                                label="Ano"
                                name="namoYear"
                                placeholder="Ano"
                                options={years.map((day) => ({ value: day, label: day }))}
                                value={year}
                                fullWidth
                                onChange={e => setYear(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-12 mt-5">
                        <p className="">Escolha a melhor foto do casal</p>
                    </div>
                    <div className="col-6 my-2 ">
                        {/* <ImageSelect/> */}
                        <ImageUploadWithEffect noDescription
                            onChange={(value) => setCouplePhoto(value)}
                            handleDescription={(value) =>''}>
                            <Button size="xl" outline fullWidth className="p-5">
                                <SquarePlus className="text-c-secondary" /> <br />
                                <span className="text-c-secondary small">Adicionar foto</span>
                            </Button>
                        </ImageUploadWithEffect>
                    </div>
                    <div className="col-12 d-flex justify-content-end mt-5">
                        <Button outline data-bs-target="#newPresentationCarousel" data-bs-slide-to={1} disabled={!userName || !loveName || !day || !month || !year || !couplePhoto}>
                            Próximo <ChevronRight />
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}