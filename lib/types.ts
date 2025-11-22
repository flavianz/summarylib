interface SearchResult {
    book_id: string;
    title: string;
    author: string;
    summary: string;
    summaryLanguage: string;
    bookLanguage: string;
}

type SearchResults = SearchResult[];