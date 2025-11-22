import type {Metadata} from "next";
import "./globals.css";
import React from "react";

import AdSense from "@/components/ads/AdSense";
import Wordmark from "@/components/Wordmark";
import BookmarksPageButton from "@/components/BookmarksPageButton";
import SearchInput from "@/components/SearchInput";

export const metadata: Metadata = {
    title: "SummaryLib | Home",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            {/*<AdSense pId={"1921734779513180"}/>*/}
            <title>SummaryLib</title>
        </head>
        <body

        >
        <div className={`h-screen flex flex-col`}>
            <div className={"flex flex-row justify-between py-3 px-1 items-center"}>
                <Wordmark/>
                <div className="w-[40%]"><SearchInput isNavBar={true}/></div>
                <BookmarksPageButton/>
            </div>
            <div className="grow flex min-h-0">{children}</div>
        </div>

        </body>
        </html>
    );
}
