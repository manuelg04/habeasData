/* eslint-disable import/prefer-default-export */
import { RowDataPacket } from 'mysql2';
import { Usuario } from '../../tipos';
import db from '../../db';

export async function getUserByCedula(cedula: string): Promise<Usuario | null> {
  const [rows] = await db.query('SELECT nombres,cedula,celular,correo FROM infousuarios WHERE cedula = ?', [cedula]);
  const rowData = rows as RowDataPacket[];
  if (rowData.length > 0) {
    return rows[0] as Usuario;
  }
  return null;
}
