'use client';
import {useRef, useState} from "react";
import {GptMessage} from "@/models/gpt";
import ChatBlock from "@/components/chatBlock/chatBlock";
import React from "react";
import {PDF} from "@/models/pdf";
import Head from "next/head";
import Script from "next/script";
import {signIn} from "next-auth/react";
let pdfjsLib : any = null;
if (typeof window !== 'undefined') {
    pdfjsLib = require('pdfjs-dist');
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js';
}


const providers = {
    "google":
        {
            id: "google",
            name: "Google",
            style: 'bg-white border hover:bg-gray-100 text-black w-[90%]',
        },

}



export default function Home() {

    return (
        <main className="flex flex-col relative max-w-md mx-auto justify-center">
            <div className={"bg-backgroundAccent "}>
                <div className="text-center  tracking-tight rounded-t-3xl  bg-primary ">
                    <h2 className={"font-medium text-2xl p-4"}>
                        MEMBER LOGIN
                    </h2>
                </div>
                <div className={"flex flex-col p-4 bg-white rounded-b-lg flex-shrink-0 gap-2 w-full"}>
                    {
                        Object.values(providers ?? {}).map((provider: any) => {
                                let className: String = provider.style;
                                return (<button key={provider.name}
                                                className={className + " w-full flex justify-center relative inline-flex items-center gap-x-2 rounded-md bg-transparent px-20 py-5 text-sm font-semibold text-white shadow-sm"}
                                                onClick={async () => {

                                                    signIn(provider.id, {
                                                        redirect: true,
                                                        callbackUrl: "/",
                                                    })
                                                }}>
                                    <div className="inline-flex absolute left-4">
                                    </div>
                                    <p className="text-black font-medium text-xs">
                                        {provider.name} 계정으로 계속하기
                                    </p>
                                </button>)
                            }
                        )}

                </div>
            </div>

        </main>
    )

}
