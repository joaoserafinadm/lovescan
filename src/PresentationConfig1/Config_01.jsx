import { useState } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Select from "../components/Select";



export default function Config_01(props) {


    const [userName, setUserName] = useState('');
    const [loveName, setLoveName] = useState('');
  
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
  
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
                        />
                    </div>
                    <div className="col-12 my-2">
                        <p className="">Quando vocês se conheceram?</p>
                    </div>
                    <div className="col-12 d-flex justify-content-center     my-2">
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
                                placeholder="Dia"
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
                                placeholder="Dia"
                                options={years}
                                value={year}
                                fullWidth
                                onChange={e => setYear(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="col-12 my-2">
                        <p className="text-c-secondary">Agora, podemos continuar!</p>
                    </div>
                    <div className="col-12 ">
                        <Button size="xl" variant="primary" fullWidth data-bs-target="#presentationConfig1Carousel" data-bs-slide-to={1}>
                            Começar agora!
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}