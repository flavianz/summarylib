"use client"
import React from "react";

import AdBanner from "@/components/ads/AdBanner";


export default function SummaryLayout({children}: { children: React.ReactNode }) {
    return <div className="flex flex-col grow min-h-0">
        <div className={"flex flex-row mt-10 grow min-h-0"}>
            <div className={"flex-3 flex min-h-0"}>
                {children}
            </div>
            <div className={"flex-1 flex-shrink-0"}>
                <AdBanner dataAdFormat={"vertical"}
                          dataFullWidthResponsive={true}/>
            </div>
        </div>
    </div>
}
