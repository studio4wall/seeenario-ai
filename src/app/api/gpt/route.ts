import { NextResponse } from 'next/server'
import {GPT4, openai} from "@/models/gpt";
import { OpenAIStream, StreamingTextResponse } from 'ai'
export async function POST(req: Request) {

    const { messages } = await req.json();
    console.log(messages)


    const data = await GPT4.sendRequest(messages);
    const stream = OpenAIStream(data);

    return new StreamingTextResponse(stream);
}

