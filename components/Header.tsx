import React from "react"
import Link from "next/link"

export default function Header() {
    return (
        <header className=" top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 ">
            <div className="flex items-center">
                <Link href="/">
                    Alojamientos
                </Link>
            </div>
        </header>
    )
}