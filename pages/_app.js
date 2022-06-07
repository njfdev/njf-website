import 'styles/globals.css'
import { motion, AnimatePresence } from 'framer-motion'
import NavBar from 'components/NavBar';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from 'components/IconButton';
import { mdiCloseThick  } from "@mdi/js";
import { getSession, SessionProvider } from "next-auth/react"
import { H1 } from 'components/CustomTags';
import { RotatingLines } from 'react-loader-spinner'
import { getUserServer } from 'lib/user';
import App from 'next/app';

function MyApp({ Component, pageProps, session, user }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  var handlingQueryError = false;

  const handleRouteChange = (url) => {
    window.gtag('config', process.env.FIREBASE_MEASUREMENT_ID, {
      page_path: url,
    });
  };

  useEffect(() => {
    const handleStart = (url) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url) => {(url !== router.asPath) && setLoading(false); handleQueryError = false;};

    router.events.on('routeChangeComplete', handleRouteChange);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events]);
  
  const handleQueryError = () => {
    if (router.query.error && !handlingQueryError && !loading) {
      handlingQueryError = true;
      toast.error(
        router.query.error == 'already-has-session' ? "You Are Already Logged In" :
        router.query.error == 'no-session' ? "Please Login" :
        router.query.error == 'insufficient-privileges' ? `You Do Not Have Permission To Access ${router.query.title}` :
        `Error: ${router.query.error}`
      );
      router.push(`${router.pathname}${router.query.redirect ? `?redirect=${router.query.redirect}` : ""}`, undefined, { shallow: true });
    }
  }
  // Run on initial load
  useEffect(() => {
    handleQueryError();
  })
  // Run when NextJS using client side routing
  useEffect(() => {
    handleQueryError();
  }, [router.route])

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

      <NavBar user_={user}/>

      <ToastContainer 
        toastClassName={({ type }) => "relative flex p-1 min-h-10 rounded-none md:rounded-xl justify-between overflow-hidden cursor-pointer bg-neutral-800"}
        position="bottom-right"
        closeButton={CloseButton}
      />

      <AnimatePresence exitBeforeEnter>
        {!loading &&
          <motion.div
            key={router.route}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.05 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            >
              <Component {...pageProps} />
          </motion.div>
        }
        {loading &&
          <motion.div
            key={"loading-screen"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.05 } }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 w-[100%] h-[100%] flex justify-center"
            >
            <div className='flex flex-col justify-center'>
              <RotatingLines width="75" />
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  let session = undefined
  let user = undefined
  if (typeof window === 'undefined')
    session = await getSession(appContext.ctx);
    user = session ? await getUserServer(session) : undefined;
  const pageProps = await App.getInitialProps(appContext)
  return { ...pageProps, ...((session !== undefined) ? { session } : {}), ...((user !== undefined) ? { user } : {}) }
}

export default MyApp
