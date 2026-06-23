import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { audioUrl } = await req.json();

    if (!audioUrl) {
      return NextResponse.json({ error: 'Audio URL is required' }, { status: 400 });
    }

    if (!process.env.REPLICATE_API_TOKEN || process.env.REPLICATE_API_TOKEN === 'your_replicate_token_here') {
      return NextResponse.json(
        { error: 'Replicate API token is missing or not configured' },
        { status: 500 }
      );
    }

    const prediction = await replicate.predictions.create({
      version: "25a173108cff36ef9f80f854c162d01df9e6528be175794b8115892d80d59b56",
      input: {
        audio: audioUrl,
        jobs: 0,
        stem: "vocals",
      }
    });

    return NextResponse.json({ predictionId: prediction.id }, { status: 201 });
  } catch (error: any) {
    console.error('Error starting separation:', error);
    return NextResponse.json({ error: error.message || 'Failed to start separation' }, { status: 500 });
  }
}
