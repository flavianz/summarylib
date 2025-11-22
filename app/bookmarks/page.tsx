"use client"
import React, {useEffect, useState} from "react";
import SearchResult from "@/components/SearchResult";
import AdBanner from "@/components/ads/AdBanner";

export default function Bookmarks() {
    const [books, setBooks] = useState<SearchResult[] | null>(null);

    useEffect(() => {
        try {
            const storedIds = localStorage.getItem("bookmarks");
            if (!storedIds) return;

            const ids: number[] = JSON.parse(storedIds);

            fetch("/api/bookmarks", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({ids}),
            })
                .then((res) => res.json())
                .then((data) => {
                    setBooks(data);
                });
        } catch (error) {
            setBooks([]);
            console.error("Error fetching bookmarks:", error);
        }
    }, []);

    if (!books) return <div className="grow flex justify-center items-center">
        <div className="loader"></div>
    </div>;
    if (books.length === 0) return <p>No books found</p>;

    return <div className={"grow flex flex-col"}>
        <div className={"grow flex flex-row  mt-10 justify-center"}>
            <div className={"flex-1"}></div>
            <div className={"flex-2"}>
                <h1 className="text-4xl font-bold mb-5">Your Bookmarks</h1>
                <div>{books.map((book, key) => {
                    return <SearchResult book={book} subkey={key} key={key}/>
                })}</div>
            </div>
            <div className={"flex-1 "}><AdBanner dataAdFormat={"vertical"} dataFullWidthResponsive={false}/></div>
        </div>
    </div>
}