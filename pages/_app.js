import "@/styles/globals.css";
import "@/styles/text.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

import { Geist, Geist_Mono } from "next/font/google";
import Layout from "@/src/layout";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function App({ Component, session, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);


  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`} >
      <SessionProvider session={session}>

      <Layout>

        <Component {...pageProps} />
      </Layout>
      </SessionProvider>
    </div>
  );
}
