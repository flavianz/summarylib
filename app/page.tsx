import SearchInput from "@/components/SearchInput";
import React, {Suspense} from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'SummaryLib | Chapter-Summaries & Analysis',
    description: 'Thousands of Books - Analyzed and Summarized, Chapter by Chapter.',
    keywords: ["summary", "book summary", "chapter summary", "chapter-by-chapter summary"]
};

export default function Home() {
    return (
        <div className={"flex flex-1 flex-col justify-center items-center w-screen"}>
            <h1 className="font-bold text-5xl mb-5 text-center"><span
                className="text-[var(--primary)]">Thousands</span> of Books
            </h1>
            <h3 className="text-gray-600 text-lg mb-10 text-center">Analyzed and Summarized, Chapter by Chapter</h3>
            <div className="landscape:w-[40%] not-landscape:w-[90%] mb-[10%]"><Suspense><SearchInput/></Suspense></div>
        </div>
    );
}
