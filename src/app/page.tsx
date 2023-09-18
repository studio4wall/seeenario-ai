'use client';
import {useRef, useState} from "react";
import {GptMessage} from "@/models/gpt";
import ChatBlock from "@/components/chatBlock/chatBlock";
import React from "react";
import {PDF} from "@/models/pdf";
import Head from "next/head";
import Script from "next/script";
let pdfjsLib : any = null;
if (typeof window !== 'undefined') {
    pdfjsLib = require('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js';
}



export default function Home() {


    const [messages, setMessages] = useState<GptMessage[]>([])
    const [currentMessage, setCurrentMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const ref = useRef(null);
    const [file, setFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [script, setScript] = useState<string>("");

    const onEnterPress = (e: any) => {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            sendMessage()
        }
    }

    const readPDF = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async function(event) {
            const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
            // @ts-ignore
            const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
            let text = '';

            for (let i = 1; i <= pdf.numPages; i++) {
                const page = await pdf.getPage(i);
                const content = await page.getTextContent();
                // @ts-ignore
                text += content.items.map(item => item.str).join(' ') + '\n';
            }

            // Here, you can set the state or do something with the extracted text.
            console.log(text);
        };
        reader.readAsArrayBuffer(file);
    };

    const sendMessage = async () => {


        const newMessages: GptMessage[] = [
            ...messages,
            {
                role: "user",
                content: currentMessage
            }
        ];
        setMessages(newMessages);
        setLoading(true);
        setCurrentMessage("")

        const result = await fetch("/api/gpt/script2novel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    script: currentMessage
                })
            }
        ).then((response) => {
            console.log(response);
            const reader = response.body?.getReader();
            let text = "";

            function readStream() :any {
                return reader?.read().then(({ done, value }) => {
                    if (done) {
                        return;
                    }

                    text += new TextDecoder('utf-8').decode(value);

                    const newMessage = {
                        role: "assistant",
                        content: text
                    } as GptMessage;
                    setMessages([...newMessages, newMessage]);

                    return readStream(); // 스트림을 계속 읽습니다.
                });
            }

            return readStream();
        }).catch((error) => {
            console.log(error);
        }
        );

        setLoading(false);

    };

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    }

    const uploadFile = async () => {


        const file = fileInputRef.current ? fileInputRef.current.files ? fileInputRef.current.files[0] : null  : null

        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const response = await fetch('/api/pdf', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('There was an error uploading the file.', error);
        }
    };


    return (
        <main className="flex flex-col relative">
            <input
                ref={fileInputRef}
                type="file"
                   onChange={(e) => {
                          readPDF(e)
                   }
                     }
            />

            <button onClick={uploadFile}>
                <Head>
                    <Script src="https://github.com/mozilla/pdf.js/blob/master/examples/node/getinfo.js#L13-L20"></Script>
                </Head>
                Convert
            </button>
                <div className={"flex-grow grid grid-cols-2  divide-y divide-x items-start justify-start"}>
                    {
                        messages.map((message, index) => {
                            return (
                                <ChatBlock message={message} key={index}/>
                            );
                        })
                    }
                    {
                        loading && (
                            <div>
                                Loading...
                            </div>
                        )
                    }
                </div>
                <form
                    className={"fixed bottom-0 inset-x-0 border-0 bg-background p-4"}
                    ref={ref}>
                                <textarea

                                    onKeyDown={onEnterPress}
                                    onSubmit={() => {
                                        sendMessage()
                                    }}
                                    value={currentMessage}
                                    onChange={(e) => {
                                        setCurrentMessage(e.target.value)
                                    }}
                                    className="p-4 w-full resize-none bg-background border ring-0 rounded-md">
                    </textarea>

                </form>
        </main>
    )
}
