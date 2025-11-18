import React from "react";
import SearchInput from "../SearchInput";

export default function SearchLayout({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <SearchInput/>
            <div className={"flex flex-row"}>
                <div className={"flex-1 bg-amber-100"}>Filter</div>
                <div className={"flex-2"}>{children}</div>
                <div className={"flex-1 bg-amber-100"}>Ads</div>
            </div>
        </div>
    );
}
