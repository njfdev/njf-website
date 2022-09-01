import React, { useEffect } from "react";
import { init } from "@socialgouv/matomo-next";
import "../styles/global.css";
import "../styles/fonts.css";

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

export default function App({ Component, pageProps }) {
  useEffect(() => {
    init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
  }, []);
  
  return <Component {...pageProps} />;
}