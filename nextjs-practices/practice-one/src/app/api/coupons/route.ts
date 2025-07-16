import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export const GET = async () => {
  const filePath = path.join(process.cwd(), 'src/data/coupons.json');
  const fileContents = await fs.readFile(filePath, 'utf-8');
  const coupons = JSON.parse(fileContents);

  return NextResponse.json(coupons);
};
