import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: 'Prediction ID is required' }, { status: 400 });
    }

    const prediction = await replicate.predictions.get(id);

    return NextResponse.json(prediction, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching prediction status:', error);
    return NextResponse.json({ error: error.message || 'Failed to fetch status' }, { status: 500 });
  }
}
