import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const res = await fetch(`${process.env.BACKEND_URL}/cron`);

  if (!res.ok) {
    return NextResponse.json({ message: 'Cron failed' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Cron triggered' });
}
