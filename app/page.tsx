import SearchInput from "@/app/SearchInput";
import React from "react";

export default function Home() {
    return (
        <div className={"flex flex-1 flex-col justify-center items-center w-screen"}>
            <h1 className="font-bold text-5xl mb-5"><span className="text-[var(--primary)]">Thousands</span> of Books
            </h1>
            <h3 className="text-gray-600 text-lg mb-10">Analyzed and Summarized, Chapter by Chapter</h3>
            <div className="w-[40%] "><SearchInput/></div>
        </div>
    );
}
