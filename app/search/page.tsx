import {use} from "react";

export default async function SearchPage({searchParams}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const search = (await searchParams).search;
    const searchResult = await fetch(`${process.env.BASE_URL}/api/search?search=${search}`);
    if (!searchResult.ok) {
        console.log(searchResult);
        return <div>Error: {searchResult.status}</div>
    }
    const books = await searchResult.json() as {
        title: string,
        author: string,
        summary: string,
        bookLanguage: string,
        summaryLanguage: string
    }[];
    return <div>{books.map((book, key) => {
        return <div key={key}>{book.title} by {book.author} in {book.summaryLanguage}</div>
    })}</div>
}