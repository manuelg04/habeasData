import '../styles/globals.css';
import Navbar from '../../components/navBar';
import PlantillaEmail from '../emails/plantillaEmail';
import MyFooter from '../../components/footer';

function MyApp({ Component, pageProps }) {
  return (

    <>
      <Navbar />
      <Component {...pageProps} />
      <PlantillaEmail />
      <MyFooter />
    </>

  );
}

export default MyApp;
