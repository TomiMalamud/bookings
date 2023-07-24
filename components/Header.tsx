import React from "react"
import Link from "next/link"
import { PhotoIcon } from "@heroicons/react/24/solid"

export default function Header() {
    return (
        <header className="top-0 z-50 flex items-center justify-between w-full h-16 px-4 sm:px-16 border-b shrink-0 ">
            <div className="font-bold text-slate-800">
                <Link href="/" className="flex items-center text-md">
                    <PhotoIcon className="w-7 h-7 sm:w-7 sm:h-7 mr-2 text-blue-300" />
                    Perla Serrana
                </Link>
            </div>
        </header>
    )
}