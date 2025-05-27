
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import LandingPage from "@/src/indexPage/LandingPage";
import IndexPage from "@/src/indexPage/IndexPage";

export default function Home() {

  const token = jwt.decode(Cookie.get('auth'))


  return (
    <>
      {token ?
        <IndexPage />
        :
        <LandingPage />
      }
    </>
  );
}
