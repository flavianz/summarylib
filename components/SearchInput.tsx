"use client"

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import React, {useEffect, useState} from "react";

export default function SearchInput({isNavBar = false}: {
    isNavBar?: boolean
}) {
    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const [value, setValue] = useState(search ? search : "");
    const router = useRouter();
    const pathname = usePathname()

    useEffect(() => {
        setValue(search ? search : "")
    }, [searchParams])

    function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
        if (e) {
            e.preventDefault();
        }
        router.push(`/search?search=${value}`);
    }

    return !(isNavBar && (pathname == "/" || pathname == "")) && <form onSubmit={handleSubmit}>
        <div
            className="border border-[var(--secondary)] shadow-[var(--secondary)] rounded-4xl flex justify-center pl-8 pt-2 pr-2 pb-2">
            <input type="text"
                   className="focus:outline-none focus:ring-0 border-transparent flex-1 min-w-0 mr-1" value={value}
                   onChange={(e) => setValue(e.target.value)}
                   placeholder="Search for books or authors..."
            />
            <button className="bg-[var(--primary)] pl-5 pr-5 pt-2 pb-2 rounded-4xl hover:cursor-pointer"
                    onClick={() => handleSubmit()}>
                Search
            </button>
        </div>
    </form>
}