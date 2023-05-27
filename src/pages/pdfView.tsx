import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const InvoicePDF = dynamic(() => import('./PdfDocumento'), {
  ssr: false,
});

const View = () => {
  const [, setCliente] = useState(false);

  useEffect(() => {
    setCliente(true);
  }, []);

  return (

    <InvoicePDF />

  );
};

export default View;
