import 'styles/globals.css'
import { motion, AnimatePresence } from 'framer-motion'
import NavBar from 'components/NavBar';
import { useEffect, useState } from 'react';
import Script from 'next/script';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from 'components/IconButton';
import { mdiCloseThick } from "@mdi/js";
import { useRouter } from 'next/router';
import { getSession, SessionProvider } from 'next-auth/react';
import CircularProgress from '@mui/material/CircularProgress';
import App from 'next/app';
import 'lib/prism.js';
import 'styles/prism.css';

function MyApp({ Component, pageProps, session }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = (url) => (url !== router.asPath) && setLoading(true);
    const handleComplete = (url) => { 
      if (url !== router.asPath) {
        setLoading(false);
        handlingQueryError = false; 
      };
    }

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events]);

  const handlingQueryError = false;

  const handleQueryError = () => {
    if (router.query.error && !handlingQueryError) {
      handlingQueryError = true;

      var error = router.query.error;
      const message = error === 'not-admin' ? 'You Do Not Have Admin Privileges' :
                      error === 'no-session' ? 'Please Sign In' :
                      error === 'has-session' ? 'You Are Already Signed In' :
                      'An Unknown Error Has Occurred';

      toast.error(message);
      router.push(router.route, undefined, { shallow: true })
    }
  }

  useEffect(() => {
    handleQueryError();
  }, [router.query])

  useEffect(() => {
    handleQueryError();
  }, [])

  const CloseButton = ({ closeToast }) => (
    <IconButton
      icon={mdiCloseThick}
      onClick={closeToast}
    />
  );

  return (
    <SessionProvider>
      <NavBar server_session={session} />

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
            <div className='flex flex-col justify-center text-neutral-800 dark:text-neutral-100'>
              <CircularProgress size={65} color={'inherit'} />
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  let session = undefined
  if (typeof window === 'undefined')
    session = await getSession(appContext.ctx);
  const pageProps = await App.getInitialProps(appContext)
  return { ...pageProps, ...((session !== undefined) ? { session } : {}) }
}

export default MyApp
