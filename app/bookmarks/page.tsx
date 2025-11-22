"use client"
import React, {useEffect, useState} from "react";
import SearchResult from "@/components/SearchResult";

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

    if (!books) return <p>Loading...</p>;
    if (books.length === 0) return <p>No books found</p>;

    return <div className={"grow flex flex-col"}>
        <div className={"grow flex flex-row  mt-10 justify-center"}>
            <div className={"flex-1"}>Filter</div>
            <div className={"flex-2 flex"}>
                <div>{books.map((book, key) => {
                    return <SearchResult book={book} key={key}/>
                })}</div>
            </div>
            <div className={"flex-1 "}>Adsss</div>
        </div>
    </div>
}