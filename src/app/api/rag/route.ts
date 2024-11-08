// src/app/api/hello/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getRagResponse } from './getRagResponse';
import { returnTopResponses } from './closestCandidate';
import { MyMessage } from './type';

export async function POST(req: NextRequest) {
  const messages: MyMessage[] = await req.json()
  const apiKey = req.headers.get('Authorization')
  try {
    if (apiKey === null)
      throw ("no api key was provided")
    let result = await getRagResponse(JSON.parse(JSON.stringify(messages)),apiKey)
    // You now have the file data as a Buffer, ready for processing
    let retrieval = undefined;
    if (result.includes("Give me candidate")) {
      const topCandidates = await returnTopResponses(result, 3)
      retrieval = JSON.stringify(result) + "here are the top 3 candidates i found please tell me succintly interesting information about them individually regarding how well they would fit the position"+ JSON.stringify(topCandidates)
        messages.push({role: "user", content: retrieval})
        console.log(messages)
        console.log(JSON.stringify(messages))
        result = await getRagResponse(JSON.parse(JSON.stringify(messages)),apiKey)

        
      }

    return NextResponse.json({ success: true, response: result , retrieval: retrieval});
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
