"use client"
import SearchInput from "@/app/SearchInput";
import React from "react";

import AdBanner from "@/components/AdBanner";

export default function SummaryLayout({children, params}: { children: React.ReactNode, params: { id: string } }) {
    return <div className="flex flex-col grow">
        <div className="flex flex-row justify-center">
            <div className="w-[40%] "><SearchInput/></div>
        </div>
        <div className={"flex flex-row mt-10 grow"}>
            <div className={"flex-3 flex"}>
                {children}
            </div>
            <div className={"flex-1"}>
                <AdBanner dataAdSlot={"ca-pub-1921734779513180"} dataAdFormat={"auto"} dataFullWidthResponsive={true}/>
            </div>
        </div>
    </div>
}
