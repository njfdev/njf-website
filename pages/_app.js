import 'styles/globals.css'
import { motion, AnimatePresence } from 'framer-motion'
import NavBar from 'components/NavBar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${process.env.FIREBASE_MEASUREMENT_ID}`}/>

      <Script strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.FIREBASE_MEASUREMENT_ID}');
          page_path: window.location.pathname;
        `}
      </Script>

      <NavBar />

      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.05 } }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default MyApp
