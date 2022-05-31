import 'styles/globals.css'
import { motion, AnimatePresence } from 'framer-motion'
import NavBar from 'components/NavBar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {
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

  return (
    <>
      <Script strategy='afterInteractive' src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "415794167ab74774affafc3302cf14b9"}' />

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
