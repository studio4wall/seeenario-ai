import { NextResponse } from 'next/server'
import {GPT4, openai} from "@/models/gpt";
import { OpenAIStream, StreamingTextResponse } from 'ai'
export async function POST(req: Request) {

    const { script } = await req.json();


    const data = await GPT4.convertScriptToNovel(script);
    const stream = OpenAIStream(data);

    return new StreamingTextResponse(stream);
}

