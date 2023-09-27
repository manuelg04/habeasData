import Feature from '../components/Feature';
import Hero from '../components/hero';
import Layout from '../components/layout/layout';
import Pricing from '../components/pricing';

export default function Home() {
  return (

    <Layout>
      <Hero />
      <Feature />
      <Pricing />
    </Layout>

  );
}
