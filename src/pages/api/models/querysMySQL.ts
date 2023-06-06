import db from '../../../db';

async function fetchUserData() {
  const [rows] = await db.query('SELECT nombres, cedula, celular, email, acepto FROM infousuarios');
  return rows;
}

export default fetchUserData;
