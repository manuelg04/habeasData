import connectToDatabase from '../../db';

async function fetchUserData() {
  const db = await connectToDatabase();
  console.log("🚀 ~ db:", db);

  const [rows] = await db.query('SELECT nombres, cedula, celular, email, acepto FROM infousuarios');
  return rows;
}

fetchUserData().then((users) => {
  console.log(users);
}).catch((error) => {
  console.error('Hubo un error al recuperar los datos del usuario: ', error);
});

export default fetchUserData;
