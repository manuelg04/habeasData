import '../styles/globals.css';
import Navbar from '../../components/navBar';
import PlantillaEmail from '../emails/plantillaEmail';

function MyApp({ Component, pageProps }) {
  return (

    <>
      <Navbar />
      <Component {...pageProps} />
      <PlantillaEmail />
    </>

  );
}

export default MyApp;
