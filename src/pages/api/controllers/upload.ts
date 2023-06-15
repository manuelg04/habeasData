import nextConnect from 'next-connect';
import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';

const upload = multer({ dest: '/tmp/uploads/' }); // Cambia esto a tu directorio preferido

const apiRoute = nextConnect({
  onError(error, req, res: NextApiResponse) {
    res.status(501).json({ error: `Lo siento, ocurrió un error ${error.message}` });
  },
  onNoMatch(req, res: NextApiResponse) {
    res.status(405).json({ error: `Método '${req.method}' no permitido` });
  },
});

apiRoute.use(upload.single('file'));

apiRoute.post((req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.file); // Aquí puedes ver los detalles del archivo subido

  // Aquí puedes leer y procesar el archivo de Excel
  // ...

  res.status(200).json({ data: 'Archivo subido con éxito' });
});

export default apiRoute;
