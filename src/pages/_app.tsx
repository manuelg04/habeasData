import '../styles/globals.css';
import Navbar from '../../components/navBar';
import 'swiper/swiper-bundle.min.css';

function MyApp({ Component, pageProps }) {
  return (

    <>
      <Navbar />
      <Component {...pageProps} />
    </>

  );
}

export default MyApp;
