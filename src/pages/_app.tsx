import '../styles/globals.css';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Navbar from '../components/navBar';
import store from '../redux/store';
import MyFooter from '../components/footer';
import Layout from '../components/layout';
import Transition from '../components/transition';

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (

    <Layout>
      <AnimatePresence mode="wait">
        <motion.div key={router.route} className="h-full">
          <Transition />
          <Provider store={store}>
            <PersistGate persistor={persistor}>
              <Navbar />
              <Component {...pageProps} />
              <Analytics />
            </PersistGate>
          </Provider>
          <MyFooter />
        </motion.div>
      </AnimatePresence>
    </Layout>

  );
}

export default MyApp;
