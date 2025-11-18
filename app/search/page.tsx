import {getSearchResults} from "@/lib/queries";

export default async function SearchPage({searchParams}: {
    searchParams: Promise<{ [_: string]: string | string[] | undefined }>
}) {
    const search = (await searchParams).search;
    if (!search || search === "") {
        return <div>No search provided</div>;
    }
    if (typeof search !== "string") {
        return <div>Invalid search</div>;
    }
    const books = await getSearchResults(search);
    return <div>{books.map((book, key) => {
        return <div key={key}>{book.title} by {book.author} in {book.summaryLanguage}</div>
    })}</div>
}