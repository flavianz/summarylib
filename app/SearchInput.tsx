"use client"

import {useRouter} from "next/navigation";
import {useState} from "react";

export default function SearchInput() {
    const [value, setValue] = useState("");
    const router = useRouter();
    return <div
        className="border border-gray-300 shadow-[var(--secondary)] rounded-4xl flex justify-center pl-8 pt-2 pr-2 pb-2">
        <input type="text"
               className="focus:outline-none focus:ring-0 border-transparent" value={value}
               onChange={(e) => setValue(e.target.value)}/>
        <button className="bg-[var(--primary)] pl-5 pr-5 pt-2 pb-2 rounded-4xl hover:cursor-pointer"
                onClick={() => router.push(`/search?search=${value}`)}>
            Search
        </button>
    </div>
}