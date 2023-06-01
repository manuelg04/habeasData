/* eslint-disable import/prefer-default-export */
import { RowDataPacket } from 'mysql2';
import { Usuario } from '../../tipos';
import db from '../../db';

export async function getUserByCedula(cedula: string): Promise<Usuario | null> {
  try {
    const [rows] = await db.query('SELECT nombres,cedula,celular,email FROM infousuarios WHERE cedula = ?', [cedula]);
    if ((rows as RowDataPacket[]).length > 0) {
      return rows[0] as Usuario;
    }
    return null;
  } catch (error) {
    console.error(error); // this will print more details about the error
    throw error;
  }
}
