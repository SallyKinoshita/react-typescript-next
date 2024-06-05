import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS!),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const spreadsheetId = '16sAuz3_BGjm_2jHaB6MKKDLYWr391JbYq1Rm7OhXfkQ';
    const range = 'Sheet1!A:C'; // 必要に応じて範囲を変更してください

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: 'RAW',
      requestBody: {
        values: [[name, email, message]],
      },
    });

    return NextResponse.json({ message: '成功' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'エラーが発生しました。' }, { status: 500 });
  }
}