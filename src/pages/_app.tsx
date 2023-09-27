import '../styles/globals.css';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence } from 'framer-motion';

import Navbar from '../components/navBar';
import store from '../redux/store';
import MyFooter from '../components/footer';
import Layout from '../components/prelayout';
import Transition from '../components/transition';
import '../styles/slick.css';

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (

    <Layout>
      <AnimatePresence mode="wait">

        <Transition />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Navbar />
            <Component {...pageProps} />
            <Analytics />
          </PersistGate>
        </Provider>
        <MyFooter />
      </AnimatePresence>
    </Layout>

  );
}

export default MyApp;
