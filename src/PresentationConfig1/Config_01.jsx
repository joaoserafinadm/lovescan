import { useState, useEffect } from "react";
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
    

    // Função para obter o número de dias em um mês específico
    const getDaysInMonth = (month, year) => {
        if (!month || !year) return 31; // Default para 31 se não houver mês/ano
        return new Date(year, month, 0).getDate();
    };

    // Função para gerar as opções de dias baseadas no mês/ano selecionado
    const getDayOptions = () => {
        const maxDays = getDaysInMonth(month, year);
        return Array.from({ length: maxDays }, (_, index) => index + 1);
    };

    const monthKeys = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    const monthOptions = monthKeys.map((key, index) => ({
        value: String(index + 1).padStart(2, '0'),
        label: key,
    }));

    const years = Array.from({ length: 100 }, (_, index) => 2025 - index);

    // Effect para ajustar o dia quando o mês ou ano mudarem
    useEffect(() => {
        if (month && year && day) {
            const maxDaysInSelectedMonth = getDaysInMonth(month, year);
            
            // Se o dia atual for maior que o máximo de dias do mês selecionado
            if (parseInt(day) > maxDaysInSelectedMonth) {
                setDay(maxDaysInSelectedMonth.toString());
            }
        }
    }, [month, year, day, setDay]);

    // Handler para mudança de mês
    const handleMonthChange = (e) => {
        const selectedMonth = e.target.value;
        setMonth(selectedMonth);
        
        // Se já houver um dia selecionado, verificar se é válido para o novo mês
        if (day && year) {
            const maxDaysInNewMonth = getDaysInMonth(selectedMonth, year);
            if (parseInt(day) > maxDaysInNewMonth) {
                setDay(maxDaysInNewMonth.toString());
            }
        }
    };

    // Handler para mudança de ano
    const handleYearChange = (e) => {
        const selectedYear = e.target.value;
        setYear(selectedYear);
        
        // Verificar especialmente para anos bissextos (fevereiro)
        if (day && month) {
            const maxDaysInMonth = getDaysInMonth(month, selectedYear);
            if (parseInt(day) > maxDaysInMonth) {
                setDay(maxDaysInMonth.toString());
            }
        }
    };

    return (
        <main className="card border-secondary bg-dark m-2 ">
            <div className="card-body">
                <div className="row d-flex justify-content-center">
                    <div className="col-12 d-flex justify-content-start my-3">
                        <h2 className="text-c-primary">Conte-me mais sobre vocês... 💕</h2>
                    </div>

                    <div className="col-12 col-md-6 my-2">
                        <Input
                            type="text"
                            placeholder="Seu primeiro nome (ou apelido)"
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
                            placeholder="Digite o nome do seu amor (ou apelido)"
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
                    
                    <div className="col-12 d-flex justify-content-center mb-2">
                        <div className="col-3 px-1">
                            <Select
                                label="Dia"
                                name="namoDay"
                                placeholder="Dia"
                                options={getDayOptions().map((day) => ({ value: day, label: day }))}
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
                                onChange={handleMonthChange}
                            />
                        </div>
                        
                        <div className="col-3 px-1">
                            <Select
                                label="Ano"
                                name="namoYear"
                                placeholder="Ano"
                                options={years.map((year) => ({ value: year, label: year }))}
                                value={year}
                                fullWidth
                                onChange={handleYearChange}
                            />
                        </div>
                    </div>
                    
                    <div className="col-12 mt-5">
                        <p className="">Escolha a melhor foto do casal</p>
                    </div>
                    
                    <div className="col-6 my-2">
                        <ImageUploadWithEffect 
                            noDescription
                            onChange={(value) => setCouplePhoto(value)}
                            handleDescription={(value) => ''}
                        >
                            <Button size="xl" outline fullWidth className="p-5">
                                <SquarePlus className="text-c-secondary" /> <br />
                                <span className="text-c-secondary small">Adicionar foto</span>
                            </Button>
                        </ImageUploadWithEffect>
                    </div>
                    
                    <div className="col-12 d-flex justify-content-end mt-5">
                        <Button 
                            outline 
                            data-bs-target="#newPresentationCarousel" 
                            data-bs-slide-to={1} 
                            disabled={!userName || !loveName || !day || !month || !year || !couplePhoto}
                        >
                            Próximo <ChevronRight />
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}