// src/app/api/hello/route.ts
import { NextResponse } from 'next/server';
import { setDB } from '.';

export async function POST(request: Request) {
  const stream = request.body as ReadableStream<Uint8Array> | null;

  if (!stream) {
    return NextResponse.json({ error: "No stream provided" }, { status: 400 });
  }

  try {
      const buffer = await streamToBuffer(stream);
      setDB(buffer)
    // You now have the file data as a Buffer, ready for processing
    return NextResponse.json({ success: true, length: buffer.length });
  } catch (error) {
    return NextResponse.json({ error: "IDC" }, { status: 500 });
  }
}

// Helper function to convert ReadableStream to Buffer
async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Buffer> {
  const chunks: Uint8Array[] = [];
  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) chunks.push(value);
  }

  return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)));
}
