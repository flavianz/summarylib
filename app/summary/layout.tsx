"use client"
import SearchInput from "@/app/SearchInput";
import React from "react";

import AdBanner from "@/components/AdBanner";

export default function SummaryLayout({children}: { children: React.ReactNode }) {
    return <div className="flex-1 flex flex-col">
        <div className="flex flex-row justify-center">
            <div className="w-[40%] "><SearchInput/></div>
        </div>
        <div className={"flex flex-row mt-10 flex-1"}>
            <div className={"flex-3"}>
                {children}
            </div>
            <div className={"flex-1"}>
                <AdBanner dataAdSlot={"ca-pub-1921734779513180"} dataAdFormat={"auto"} dataFullWidthResponsive={true}/>
            </div>
        </div>
    </div>
}
