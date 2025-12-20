import "./globals.css";
import React, {Suspense} from "react";

import Wordmark from "@/components/Wordmark";
import BookmarksPageButton from "@/components/BookmarksPageButton";
import SearchInput from "@/components/SearchInput";

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <title>SummaryLib</title>
        </head>
        <body

        >
        <div className={`h-screen flex flex-col`}>
            <div className={"flex flex-row justify-between py-3 px-1 items-center"}>
                <Wordmark/>
                <div className="w-[40%]"><Suspense><SearchInput isNavBar={true}/></Suspense></div>
                <BookmarksPageButton/>
            </div>
            <div className="grow flex min-h-0">{children}</div>
        </div>

        </body>
        </html>
    );
}
