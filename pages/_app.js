import React, { useEffect } from "react";
import { init } from "@socialgouv/matomo-next";
import "../styles/global.css";
import "../styles/fonts.css";
import Head from "next/head";
import Tracker from '@openreplay/tracker';

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;
const OPEN_REPLAY_PROJECT_KEY = process.env.NEXT_PUBLIC_OPEN_REPLAY_PROJECT_KEY;

const tracker = new Tracker({
  projectKey: OPEN_REPLAY_PROJECT_KEY,
  __DISABLE_SECURE_MODE: process.env.NODE_ENV === 'development',
})

export default function App({ Component, pageProps }) {
  let debounce = false;
  useEffect(() => {
    if (!debounce) {
      tracker.start();
      init({ url: MATOMO_URL, siteId: MATOMO_SITE_ID });
      debounce = true;
    }
  }, []);
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
      </Head>
      <Component {...pageProps} />
    </>
  );
}