import { NextResponse } from 'next/server';
import multer from "multer";
import pdfParse from 'pdf-parse';


export async function POST(req: Request) {

    const formData = await req.formData();
    const file = formData.get('pdf') as unknown as File;


    const reader = file.stream().getReader();

    console.log(file.name);
    console.log(file.type);

    const chunks : Uint8Array[] = [];
    let done, value;

    while (true) {
        ({done, value} = await reader.read());

        if (done) {
            break;
        }

        if(value)
        chunks.push(value);
        console.log(value);
    }

    const buffer = Buffer.concat(chunks);

    // PDF 파일을 처리
    const data = await pdfParse(buffer);  // pdf-parse 라이브러리를 사용한 예
    const text = data.text; // PDF 내용이 담긴 문자열



    return NextResponse.json({ text });


}