"use client"

import {useTabContext} from "@/app/summary/layout";

export default function SummaryView({summary}: {
    summary: ({} & {
        id: number,
        book_id: string,
        title: string,
        uploadedAt: Date,
        summary: string,
        analysis: string,
        author: string,
        bookLanguage: string,
        summaryLanguage: string,
        chapters: {
            number: number,
            id: number,
            book_id: string,
            summary: string,
            summaryLanguage: string,
            name: string
        }[]
    })
}) {
    const tab = useTabContext();


    function getView(tab: string) {
        if (tab === "chapters") {
            return <div>{summary.chapters.map((chapter, key) => {
                return <div key={key} className="pb-6">
                    <h2 className="font-semibold text-xl text-[var(--dark)]">{chapter.number} {chapter.name}</h2>
                    <p>{chapter.summary}</p>
                </div>
            })}</div>
        } else if (tab === "analysis") {
            return <p className="text-lg whitespace-pre-wrap">{summary.analysis}</p>
        } else {
            return <p className="text-lg whitespace-pre-wrap">{summary.summary}</p>
        }
    }

    return <>
        <h1 className="font-bold text-4xl">{summary.title}</h1>
        <div className="flex flex-row">
            <p className="pr-4 text-lg text-gray-600">{summary.author}</p>
            <p className="text-lg text-gray-600">{getLanguageFromCode(summary.bookLanguage)}</p>
        </div>
        <div className="h-4"></div>
        {getView(tab)}
    </>
}

function getLanguageFromCode(code: string) {
    switch (code) {
        case "en":
        default:
            return "English";
        case "de":
            return "German"
        case "fr":
            return "French"
    }
}