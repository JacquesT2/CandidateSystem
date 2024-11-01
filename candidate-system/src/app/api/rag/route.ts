// src/app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getRagResponse } from './getRagResponse';
import { returnTopResponses } from './closestCandidate';
import { MyMessage } from './type';

export async function POST(req: NextRequest) {
  const messages: MyMessage[] = await req.json()

  try {
    let result = await getRagResponse(JSON.parse(JSON.stringify(messages)))
      // You now have the file data as a Buffer, ready for processing
    if (result.includes("Give me candidate")) {
        const topCandidates = await returnTopResponses(result, 3)
        messages.push({role: "user", content: result + "here are the top 3 candidates i found please tell me succintly interesting information about them individually regarding how well they would fit the position"+ topCandidates})
      result = await getRagResponse(JSON.parse(JSON.stringify(messages.toString())))
      console.log(messages)
      console.log(JSON.stringify(messages))
        
      }

    return NextResponse.json({ success: true, response: result });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
