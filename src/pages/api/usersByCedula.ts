/* eslint-disable import/prefer-default-export */
import { Usuario } from '../../tipos';
import db from '../../db';

export async function getUserByCedula(cedula: string): Promise<Usuario | null> {
  const { rows } = await db.query('SELECT nombres,cedula,celular,email FROM infousuarios WHERE cedula = $1', [cedula]);
  if (rows.length > 0) {
    return rows[0] as Usuario;
  }
  return null;
}
