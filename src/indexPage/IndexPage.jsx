import Link from "next/link";
import Button from "../components/Button";
import { useAuth } from "../layout/context/AuthContext";
import MyPresentations from "./myPresentations";
import MyClients from "./MyClients";

export default function IndexPage(props) {

    const {  user } = useAuth();
  


  return (
    <div className="pages">
      {/* <div className="row my-3">
        <div className="col-12 mx-3 d-flex justify-content-start">
          <Link href="/forCompanies">
            <Button size="lg" variant="primary" className="pulse">
              Para empresas
            </Button>
          </Link>
        </div>
      </div> */}
      <div className="card border-secondary bg-dark m-2 mb-5">
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <h2>Olá {user?.userName.split(" ")[0]}!</h2>
            </div>
            
            <MyClients />
            <MyPresentations />
          </div>
          
        </div>
      </div>
    </div>
  );
}
