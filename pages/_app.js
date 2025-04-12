import "@/styles/globals.css";
import "@/styles/text.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

import { Geist, Geist_Mono } from "next/font/google";
import Layout from "@/src/layout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function App({ Component, pageProps }) {

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);


  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`} >
      <Layout>

        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
