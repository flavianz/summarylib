import SearchInput from "@/components/SearchInput";
import React, {Suspense} from "react";

export default function NotFound() {
    return (
        <div className={"flex flex-1 flex-col justify-center items-center w-screen"}>
            <h1 className="font-bold text-5xl mb-5"><span className="text-[var(--primary)]">404</span> - Page Not Found
            </h1>
            <h3 className="text-gray-600 text-lg mb-10">This page does not exist :(</h3>
            <div className="w-[40%] "><Suspense><SearchInput/></Suspense></div>
        </div>
    );
}