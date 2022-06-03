import 'styles/globals.css'
import { motion, AnimatePresence } from 'framer-motion'
import NavBar from 'components/NavBar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Script from 'next/script';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from 'components/IconButton';
import { mdiCloseThick  } from "@mdi/js";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  const handleRouteChange = (url) => {
    window.gtag('config', process.env.FIREBASE_MEASUREMENT_ID, {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  const CloseButton = ({ closeToast }) => (
    <IconButton
      icon={mdiCloseThick}
      onClick={closeToast}
    />
  );

  return (
    <SessionProvider session={session}>
      <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${process.env.FIREBASE_MEASUREMENT_ID}`}/>

      <Script id="gtag-setup-script" strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.FIREBASE_MEASUREMENT_ID}');
          page_path: window.location.pathname;
        `}
      </Script>
      <Script strategy='afterInteractive' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "415794167ab74774affafc3302cf14b9"}' />

      <NavBar />
      <ToastContainer 
        toastClassName={({ type }) => "relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer bg-neutral-800"}
        position="bottom-right"
        closeButton={CloseButton}
      />

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
    </SessionProvider>
  );
}

export default MyApp
