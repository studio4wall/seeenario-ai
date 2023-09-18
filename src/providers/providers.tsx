"use client";
import React, {useEffect, useState} from 'react';
import {store} from "@/store/store";
import {Provider} from "react-redux";
import {ThemeProvider} from "next-themes";

export default function Providers(
    props: {
        children: React.ReactNode
    }
) {

    return <ThemeProvider>
        <Provider store={store}>
            {props.children}
        </Provider>
    </ThemeProvider>;

}