import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const filePath = path.join(process.cwd(), 'db.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContents);

    const food = data.foods.find((f: any) => f.id === params.id);

    if (!food) {
      return NextResponse.json({ error: 'Food not found' }, { status: 404 });
    }

    return NextResponse.json(food);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch food' },
      { status: 500 }
    );
  }
}
