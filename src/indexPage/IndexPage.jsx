
import Link from "next/link";
import Button from "../components/Button";

export default function IndexPage(props) {
  
  


  return (
    <div className="pages">
      <Link href="/newPresentation">
        <Button>Nova apresentação</Button>
      </Link>
    </div>
  );
}
