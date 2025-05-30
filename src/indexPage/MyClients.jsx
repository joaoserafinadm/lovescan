import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../layout/context/AuthContext";
import Link from "next/link";
import Button from "../components/Button";
import {
  ArrowLeft,
  ArrowRight,
  CircleFadingPlus,
  Edit,
  Info,
  PlusCircle,
  QrCode,
  Send,
  View,
} from "lucide-react";
import { SpinnerLG } from "../components/loading/Spinners";
import UserPresentationCard from "./userPresentationCard";
import FormSendModal from "./formSendModal";
import useSWR from "swr";
import api from "@/utils/api";
import ClientCard from "./ClientCard";

export default function MyClients(props) {
  const { user } = useAuth();

  const [presentationsArray, setPresentationsArray] = useState([]);
  const [companyData, setCompanyData] = useState(null);

  const [loadingPage, setLoadingPage] = useState(true);

  const { data, error, isLoading } = useSWR(
    `/api/indexPage/myClients?user_id=${user?._id}`,
    api
  );

  useEffect(() => {
    if (data) {
      setPresentationsArray(data.data.presentations);
      setCompanyData(data.data.companyData);
      setLoadingPage(false);
    }
  }, [data]);

  // const dataFunction = async () => {
  //   await axios
  //     .get(`/api/indexPage/myClients`, { params: { user_id: user._id } })
  //     .then((res) => {
  //       setPresentationsArray(res.data.presentations);
  //       setCompanyData(res.data.companyData);
  //       setLoadingPage(false);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoadingPage(false);
  //     });
  // };
  return (
    <>
      <FormSendModal />
      {companyData ? (
        <>
          <div className="col-12 mt-4 d-flex justify-content-between align-items-center fadeItem">
            <div>
              <span className="badge bg-light text-dark">Meus clientes </span>
            </div>
            <Button
              className="d-none d-lg-block"
              data-bs-toggle="modal"
              data-bs-target="#formSendModal"
            >
              Enviar formulário
            </Button>
            <Button
              className="d-lg-none d-block"
              data-bs-toggle="modal"
              data-bs-target="#formSendModal"
            >
              <Send />
            </Button>
          </div>
          {loadingPage ? (
            <SpinnerLG />
          ) : (
            <>
              {presentationsArray.length > 0 ? (
                <>
                  {presentationsArray.map((elem) => (
                    <div className="col-12 col-lg-3 col-md-4 col-sm-6 mt-3 fadeItem">
                      <ClientCard elem={elem} />
                    </div>
                  ))}
                  <div className="col-12 d-flex justify-content-end align-items-center mt-3">
                    <Link href={`/myPresentations`}>
                      <span className="text-white cardAnimation">
                        Visualizar todos{" "}
                        <ArrowRight size={16} className="ms-1" />
                      </span>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="row fadeItem">
                  <div className="col-12 d-flex justify-content-center my-5">
                    <span className="text-center text-muted">
                      Nenhuma cliente cadastrado
                    </span>
                  </div>
                </div>
              )}
            </>
          )}
          <hr className="my-3" />
        </>
      ) : (
        <>
        <div className="col-12 mt-4 d-flex justify-content-between align-items-center fadeItem">
          <Link href="/forCompanies">
            <Button size="lg" variant="primary" className="pulse">
              Para empresas
            </Button>
          </Link>
        </div>
        <div className="col-12 mt-3">
          <span>Conheça nossa solução para empresas e potencialize suas vendas!</span>
        </div>
        <hr className="my-3" />

        </>
      )}
    </>
  );
}
