import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../layout/context/AuthContext";
import Link from "next/link";
import Button from "../components/Button";
import {
  CircleFadingPlus,
  Edit,
  Info,
  PlusCircle,
  QrCode,
  View,
} from "lucide-react";
import { SpinnerLG } from "../components/loading/Spinners";

export default function MyPresentations(props) {
  const { user } = useAuth();

  const [presentationsArray, setPresentationsArray] = useState([]);

  const [loadingPage, setLoadingPage] = useState(true);

  useEffect(() => {
    if (user) {
      dataFunction();
    }
  }, [user]);

  const dataFunction = async () => {
    await axios
      .get(`/api/indexPage/myPresentations`, { params: { user_id: user._id } })
      .then((res) => {
        setPresentationsArray(res.data);
        setLoadingPage(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingPage(false);
      });
  };
  return (
    <>
      <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
        <div>
          <span className="badge bg-light text-dark">Minhas apresentações</span>
        </div>
        <Link href="/newPresentation">
          <Button className="d-none d-lg-block">Nova apresentação</Button>
          <Button className="d-lg-none d-block">
            <CircleFadingPlus />
          </Button>
        </Link>
      </div>

      {loadingPage ? (
        <SpinnerLG />
      ) : (
        <>
          {presentationsArray.length > 0 ? (
            <>
              {presentationsArray.map((elem) => (
                <div className="col-12 col-lg-3 col-md-4 col-sm-6 mt-3 fadeItem">
                  <div className="card border-secondary bg-dark m-2">
                    <div className="square-image-container">
                      <img
                        src={elem.couplePhoto.url}
                        className="background-image"
                        alt="background"
                      />
                      <img
                        src={elem.couplePhoto.url}
                        className="main-image"
                        alt="..."
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">
                        {elem.userName} & {elem.loveName}
                      </h5>
                      {elem.status === "pending" && (
                        <span className="badge bg-c-danger text-dark">
                          Pendente
                        </span>
                      )}
                      {elem.status === "active" && (
                        <span className="badge bg-c-success text-dark">
                          Ativa
                        </span>
                      )}
                      {elem.status === "paused" && (
                        <span className="badge bg-c-warning text-dark">
                          Pausada
                        </span>
                      )}
                      <hr />
                      <p className="card-text small">
                        desde: {elem.day}/{elem.month}/{elem.year}
                      </p>
                      <p className="card-text small">
                        {elem.imagesArray.length} foto
                        {elem.imagesArray.length > 1 ? "s" : ""}
                      </p>

                      <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                          <Button variant="ghost" size="sm">
                            <Info size={16} className="text-white" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit size={16} className="text-white" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <QrCode size={16} className="text-white" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="row">
              <div className="col-12 d-flex justify-content-center my-5">
                <span className="text-center text-muted">
                  Nenhuma apresentação cadastrada
                </span>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
