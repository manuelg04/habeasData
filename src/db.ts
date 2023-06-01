import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

const pool = mysql.createPool({
  host: process.env.TIDB_HOST,
  user: process.env.TIDB_USER,
  port: parseInt(process.env.TIDB_PORT, 10),
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DATABASE,
  ssl: {
    ca: fs.readFileSync(path.join(process.cwd(), 'public/cacert.pem')),
  },
});

export default pool;
