import React from "react";
import SearchInput from "@/components/SearchInput";
import type {Metadata} from "next";

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
            <div className="flex flex-row justify-center">
                <div className="w-[40%] "><SearchInput/></div>
            </div>
            <div className={"grow flex flex-row  mt-10 justify-center"}>
                <div className={"flex-1"}>Filter</div>
                <div className={"flex-2 flex"}>{children}</div>
                <div className={"flex-1 "}>Adsss</div>
            </div>
        </div>
    );
}
