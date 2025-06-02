
import { Edit, Info, QrCode } from "lucide-react";
import Link from "next/link";
import Button from "../components/Button";

export default function UserPresentationCard(props) {

  const { elem } = props;
  return (
    <Link href={`/presentationLink/${elem._id}`}>

      <div className="card cardAnimation text-light border-secondary bg-dark m-2">
        <div className="square-image-container">
          <img
            src={elem.couplePhoto.url}
            className="background-image"
            alt="background"
          />
          <img src={elem.couplePhoto.url} className="main-image" alt="..." />
        </div>
        <div className="card-body">
          <h5 className="card-title">
            {elem.userName} & {elem.loveName}
          </h5>
          {elem.status === "pending" && (
            <span className="badge bg-c-danger text-dark">Pendente</span>
          )}
          {elem.status === "active" && (
            <span className="badge bg-c-success text-dark">Ativa</span>
          )}
          {elem.status === "paused" && (
            <span className="badge bg-c-warning text-dark">Pausada</span>
          )}
          {/* <hr />
          <p className="card-text small">
            desde: {elem.day}/{elem.month}/{elem.year}
          </p>
          <p className="card-text small">
            {elem.imagesArray.length} foto
            {elem.imagesArray.length > 1 ? "s" : ""}
          </p> */}

          <div className="row">
            <div className="col-12 d-flex justify-content-center">
              {/* <Button variant="ghost" size="sm">
              <Info size={16} className="text-white" />
            </Button>
            <Button variant="ghost" size="sm">
              <Edit size={16} className="text-white" />
            </Button> 
              <Link href={`/presentationLink/${elem._id}`}>
                <Button variant="ghost" size="sm">
                  <QrCode size={16} className="text-white" />
                </Button>
              </Link>*/}
            </div>
          </div>
        </div>
      </div>
    </Link>

  );
}
