import Header from "./Header";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '70px' }}>
        {children}
      </main>
    </>
  );
}