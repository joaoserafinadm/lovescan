import Credits from "./Credits";
import Header from "./Header";
import Cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export default function Layout({ children }) {

  const token = jwt.decode(Cookie.get('auth'))
  return (
    <>
      <Header />
      {token && (

        <Credits />
      )}
      <main style={{ paddingTop: '70px' }}>
        {children}
      </main>
    </>
  );
}