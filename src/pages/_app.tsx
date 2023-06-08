import '../styles/globals.css';
import { Provider } from 'react-redux';
import Navbar from '../components/navBar';
import store from '../redux/store';

function MyApp({ Component, pageProps }) {
  return (

    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />
    </Provider>

  );
}

export default MyApp;
