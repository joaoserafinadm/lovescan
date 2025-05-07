import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Button from "@/src/components/Button";
import PresentationConfig1 from "@/src/PresentationConfig1";
import jwt from 'jsonwebtoken'
import Cookie from 'js-cookie'
import LandingPage from "@/src/indexPage/LandingPage";
import Link from "next/link";
import IndexPage from "@/src/indexPage/indexPage";

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



    // <PresentationConfig1/>
  );
}
