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
    if (books.length === 0) return (
        <div className="flex grow justify-center items-center"><p className="text-xl">No results found for
            "{search}"</p></div>
    )
    return <div>{books.map((book, key) => {
        return <a href={"/summary/" + book.id} key={key}>
            <div className="border border-gray-300 hover:shadow-sm rounded-xl p-4 m-4 hover:cursor-pointer">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-end">
                        <h2 className="font-bold text-xl pr-4">{book.title}</h2>
                        <h4 className="text-lg">{book.author}</h4>
                    </div>
                    <p className="text-gray-500">{book.summaryLanguage.toUpperCase()}</p>
                </div>
                <p className="line-clamp-1 text-gray-700">{book.summary}</p></div>
        </a>
    })}</div>
}