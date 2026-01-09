"use client"

import Image from "next/image";
import React, {useState} from "react";
import summaryIcon from "@/public/book.svg";
import analysisIcon from "@/public/analysis.svg";
import chaptersIcon from "@/public/chapters.svg";
import shareIcon from "@/public/share.svg";
import {useRouter} from "next/navigation";
import BookmarkButton from "@/components/BookmarkButton";

export default function SummaryView({summary}: {
    summary: ({
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
    const [activeTab, setActiveTab] = useState<string>("summary");

    const router = useRouter();

    function getView(tab: string) {
        if (tab === "chapters") {
            summary.chapters.sort((a, b) => a.number - b.number);
            return <div>{summary.chapters.map((chapter, key) => {
                return <div key={key} className="pb-6 ">
                    <h2 className="font-semibold text-xl text-(--dark)">{chapter.number} {chapter.name}</h2>
                    <p className={"whitespace-pre-wrap text-lg"}>{chapter.summary}</p>
                </div>
            })}</div>
        } else if (tab === "analysis") {
            return <p className="text-lg whitespace-pre-wrap">{summary.analysis}</p>
        } else {
            return <p className="text-lg whitespace-pre-wrap">{summary.summary}</p>
        }
    }

    let tabs = [["summary", "Summary", summaryIcon], ["analysis", "Analysis", analysisIcon], ["chapters", "Chapters", chaptersIcon]];

    return <div className="flex flex-row min-h-0 w-full not-landscape:px-4 landscape:pr-[10vw] landscape:pt-5">
        <div className={"flex-1 flex flex-col items-stretch pt-10 pb-10 gap-y-1.5 not-landscape:hidden max-w-100"}>
            {
                tabs.map(([tab, tabName, icon], key) => {
                    return <button key={key} onClick={() => setActiveTab(tab)}
                                   className={"hover:cursor-pointer p-4 hover:bg-[#2b78491A] rounded-xl ml-5 mr-10" + (tab === activeTab ? " bg-[#2b78491A]" : "")}>
                        <div className="flex-1 flex flex-row justify-start">
                            <Image src={icon} alt={"icon"} width={24} height={24}/>
                            <p className="ml-4">{tabName}</p>
                        </div>
                    </button>
                })
            }
            <h4 className="font-bold text-lg ml-8 mr-5 mt-10 mb-5">Available Languages</h4>
            {
                ["en", "de", "fr"].map((langCode, key) => {
                    return <button key={key} onClick={() => router.push(`/summary/${summary.book_id}/${langCode}`)}
                                   className={"hover:cursor-pointer p-2 hover:bg-[#2b78491A] rounded-xl ml-5 mr-10" + (summary.summaryLanguage === langCode ? " bg-[#2b78491A]" : "")}>
                        <div className="flex-1 flex flex-row justify-start">
                            <p className="ml-4">{getLanguageFromCode(langCode)}</p>
                        </div>
                    </button>
                })
            }
        </div>
        <div className="flex-2 flex flex-col min-h-0">
            <div className="landscape:hidden w-full my-4">
                <div className="flex flex-row w-full">{
                    tabs.map(([tab, tabName, icon], key) => {
                        return <button key={key} onClick={() => setActiveTab(tab)}
                                       className={"hover:cursor-pointer p-4 flex border-[#2b7849] hover:border-b-4 rounded-t-xl flex-1 " + (tab === activeTab ? " bg-[#2b78491A] border-b-4" : "")}>
                            <div className="flex-1 flex flex-row justify-center items-center gap-2">
                                <Image src={icon} alt={"icon"} width={24} height={24}/>
                                <p>{tabName}</p>
                            </div>
                        </button>
                    })
                }</div>
            </div>
            <div className="flex flex-row justify-between items-center shrink-0">
                <div><h1 className="font-bold text-4xl">{summary.title}</h1>
                    <div className="flex flex-row">
                        <p className="pr-4 text-lg text-gray-600">{summary.author}</p>
                        <p className="text-lg text-gray-600">{getLanguageFromCode(summary.bookLanguage)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 pr-[5vw]">
                    <BookmarkButton bookmark={{book_id: summary.book_id, lang: summary.summaryLanguage}}/>
                    <div
                        className="hover:cursor-pointer hover:bg-[#2b78491A] rounded-3xl place-items-center w-9 h-9 flex justify-center items-center"
                        onClick={() => navigator.clipboard.writeText(window.location.href)}>
                        <Image
                            src={shareIcon} alt={"share"}
                            width={22}
                            height={22}
                        />
                    </div>
                </div>
            </div>
            <div className="h-4 shrink-0"></div>
            <div className="overflow-auto min-h-0 grow pr-2 no-scrollbar">
                <div className="pb-8">{getView(activeTab)}</div>
            </div>
        </div>
    </div>
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