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
  View,
} from "lucide-react";
import { SpinnerLG } from "../components/loading/Spinners";
import UserPresentationCard from "./userPresentationCard";

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
      <div className="col-12 mt-4 d-flex justify-content-between align-items-center fadeItem">
        <div>
          <span className="badge bg-light text-dark">Minhas apresentações pessoais</span>
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
                  <UserPresentationCard elem={elem} />
                </div>
              ))}
              {/* <div className="col-12 d-flex justify-content-end align-items-center mt-3">
                <Link href={`/myPresentations`}>
                  <span className="text-white cardAnimation">
                    Visualizar todas <ArrowRight size={16} className="ms-1" />
                  </span>
                </Link>
              </div> */}
            </>
          ) : (
            <div className="row fadeItem">
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
