"use client"
import SearchInput from "@/app/SearchInput";
import React, {useState, createContext, useContext} from "react";
import Image from "next/image";
import summary from "@/public/book.svg";
import analysis from "@/public/analysis.svg";
import chapters from "@/public/chapters.svg";
import AdBanner from "@/components/AdBanner";

const TabContext = createContext("");

export function useTabContext() {
    return useContext(TabContext);
}

export default function SummaryLayout({children}: { children: React.ReactNode }) {
    const [activeTab, setActiveTab] = useState<string>("summary");
    return <div className="flex-1 flex flex-col">
        <div className="flex flex-row justify-center">
            <div className="w-[40%] "><SearchInput/></div>
        </div>
        <div className={"flex flex-row mt-10 flex-1"}>
            <div className={"flex-1 flex flex-col items-stretch pt-10 pb-10 gap-y-1.5"}>
                {
                    [["summary", "Summary", summary], ["analysis", "Analysis", analysis], ["chapters", "Chapters", chapters]].map(([tab, tabName, icon], key) => {
                        return <button key={key} onClick={() => setActiveTab(tab)}
                                       className={"hover:cursor-pointer p-4 hover:bg-[#2b78491A] rounded-xl ml-5 mr-10" + (tab === activeTab ? " bg-[#2b78491A]" : "")}>
                            <div className="flex-1 flex flex-row justify-start">
                                <Image className="stroke-black" src={icon} alt={"icon"} width={24} height={24}/>
                                <p className="ml-4">{tabName}</p>
                            </div>
                        </button>
                    })
                }
            </div>
            <div className={"flex-2"}><TabContext.Provider value={activeTab}>
                {children}
            </TabContext.Provider></div>
            <div className={"flex-1"}>
                <AdBanner dataAdSlot={"ca-pub-1921734779513180"} dataAdFormat={"auto"} dataFullWidthResponsive={true}/>
            </div>
        </div>
    </div>
}
