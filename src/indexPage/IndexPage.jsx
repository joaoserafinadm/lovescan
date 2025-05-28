import Link from "next/link";
import Button from "../components/Button";
import { useAuth } from "../layout/context/AuthContext";
import MyPresentations from "./myPresentations";

export default function IndexPage(props) {

    const {  user } = useAuth();
  


  return (
    <div className="pages">
      <div className="card border-secondary bg-dark m-2 ">
        <div className="card-body">
          <div className="row">
            <div className="col-12">
              <h2>Olá {user?.userName.split(" ")[0]}!</h2>
            </div>
            <MyPresentations />
          </div>
          
        </div>
      </div>
    </div>
  );
}
