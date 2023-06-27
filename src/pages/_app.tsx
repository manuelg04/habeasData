import '../styles/globals.css';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '../components/navBar';
import store from '../redux/store';
import MyFooter from '../components/footer';

const persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (

    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Navbar />
          <Component {...pageProps} />
          <Analytics />
        </PersistGate>
      </Provider>
      <MyFooter />

    </>

  );
}

export default MyApp;
