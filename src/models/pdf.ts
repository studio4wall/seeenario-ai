'use client';


export class PDF {
    static convertPdfToStream(file:File){
        const pdf = require('pdf-parse');
        return pdf(file).then((value : any) =>{
            value.text
        }
        );
    }
}