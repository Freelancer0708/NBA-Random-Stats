import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  // データディレクトリを取得
  const dataDir = path.join(process.cwd(), 'public', 'data');
  const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.json'));

  // 各ファイルの内容を読み込む
  const allData = files.map(file => {
    const filePath = path.join(dataDir, file);
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return {
      fileName: file, // ファイル名を含める
      data: jsonData,
    };
  });

  return NextResponse.json(allData);
}
