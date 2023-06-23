/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable new-cap */
import axios from 'axios';
import { Buffer } from 'buffer';
import XLSX from 'xlsx';

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const workbook = XLSX.read(Buffer.from(response.data, 'binary'), { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1, raw: false });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
