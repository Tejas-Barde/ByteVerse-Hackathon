// 'use server'
// app/api/chat/route.ts

import OpenAI from "openai";
import { NextResponse } from "next/server";

// Opt out of static rendering
export const dynamic = "force-dynamic";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { message, context } = await req.json();

    // console.log(message, image)
    // console.log("Received message:", process.env.NEXT_PUBLIC_OPENAI_API_KEY);
    if (!message || !context) {
      return NextResponse.json(
        { error: "Message and context are required" },
        { status: 400 }
      );
    }

    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: `context : ${context} these is the context of the image answer the question based on this context these is the image context so suppose these as image`,
        },
        {
          role: "user",
          content: [{ type: "input_text", text: message }],
        },
      ],
    });

    return NextResponse.json({
      response: response.output_text,
    });
  } catch (error) {
    console.error("Error processing chat request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
