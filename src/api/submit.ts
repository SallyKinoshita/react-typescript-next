import { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse('./mcp-lp-c4827d69bd8b.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = '16sAuz3_BGjm_2jHaB6MKKDLYWr391JbYq1Rm7OhXfkQ';
    const range = 'Sheet1!A:C'; // 必要に応じて範囲を変更してください

    try {
      await sheets.spreadsheets.values.append({
        spreadsheetId,
        range,
        valueInputOption: 'RAW',
        requestBody: {
          values: [[name, email, message]],
        },
      });

      res.status(200).json({ message: '成功' });
    } catch (error) {
      res.status(500).json({ error: 'エラーが発生しました。' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}