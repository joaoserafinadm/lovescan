import { useAuth } from "./context/AuthContext";
import Credits from "./Credits";
import Header from "./Header";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export default function Layout({ children }) {

    const { token } = useAuth();
  
  return (
    <>
      <Header />
      {/* {token && (

        <Credits />
      )} */}
      <main style={{ paddingTop: '70px' }}>
        {children}
      </main>
    </>
  );
}