/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable import/prefer-default-export */
import mysql from 'mysql2/promise';

let connection;

const connectToDatabase = async () => {
  if (connection) return connection;

  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.log('Error al conectar a la base de datos', error);
    throw error;
  }

  return connection;
};

export default connectToDatabase;
