"use client"
import React, {useEffect, useState} from "react";
import SearchResult from "@/components/SearchResult";
import {Bookmark} from "@/lib/bookmarks";

export default function Bookmarks() {
    const [bookmarks, _] = useState<Bookmark[] | null>(null);

    useEffect(() => {
    })

    return <div className={"grow flex flex-col"}>
        <div className={"grow flex flex-row  mt-10 justify-center"}>
            <div className={"flex-1"}>Filter</div>
            <div className={"flex-2 flex"}>
                <div>{bookmarks ? bookmarks.map((book, key) => {
                    return /*<SearchResult book={book} key={key}/>*/<div></div>
                }) : <div>Keine bookmarks</div>}</div>
            </div>
            <div className={"flex-1 "}>Adsss</div>
        </div>
    </div>
}