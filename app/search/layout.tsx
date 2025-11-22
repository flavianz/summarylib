import React from "react";
import type {Metadata} from "next";
import AdBanner from "@/components/ads/AdBanner";

export const metadata: Metadata = {
    title: "SummaryLib | Search",
};

export default function SearchLayout({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={"grow flex flex-col"}>
            <div className={"grow flex flex-row  mt-10 justify-center"}>
                <div className={"flex-1"}></div>
                <div className={"flex-2 flex"}>{children}</div>
                <div className={"flex-1 "}><AdBanner dataAdFormat={"vertical"}
                                                     dataFullWidthResponsive={false}/></div>
            </div>
        </div>
    );
}
