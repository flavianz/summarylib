import React from "react";
import SearchInput from "../SearchInput";

export default function SearchLayout({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <div className="flex flex-row justify-center">
                <div className="w-[40%] "><SearchInput/></div>
            </div>
            <div className={"flex flex-row  mt-10"}>
                <div className={"flex-1"}>Filter</div>
                <div className={"flex-2"}>{children}</div>
                <div className={"flex-1 "}>Ads</div>
            </div>
        </div>
    );
}
