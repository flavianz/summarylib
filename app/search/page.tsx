import BookmarkButton from "@/components/BookmarkButton";
import {getSearchResults} from "@/lib/queries";
import {getBookmarks} from "@/lib/bookmarks";
import SearchResult from "@/components/SearchResult";

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
    if (books.length === 0) return (
        <div className="flex grow justify-center items-center"><p className="text-xl">No results found for
            "{search}"</p></div>
    )

    return <div>{books.map((book, key) => {
        return <SearchResult book={book} key={key}/>
    })}</div>
}