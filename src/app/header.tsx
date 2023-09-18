"use client";
import React from 'react'
import {usePathname, useRouter} from "next/navigation";
import Link from "next/link";

export default function Header() {



    const pathname = usePathname();

    if(pathname === "/signIn"){
        return <nav className={"sticky top-0 h-navbar-height flex flex-shrink-0"}>
        </nav>
    }



    return (
        <nav className={"sticky top-0 h-navbar-height z-50 p-4 border-b flex flex-row"}>
            <div className={"font-semibold"}>
                Studio4Wall
            </div>
            <Link href={"/signIn"}>
                SignIn
            </Link>

        </nav>
    )
}