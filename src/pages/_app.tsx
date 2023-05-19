import PlantillaEmail from '../emails/plantillaEmail';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (

    <>
      <Component {...pageProps} />
      <PlantillaEmail />
    </>

  );
}

export default MyApp;
