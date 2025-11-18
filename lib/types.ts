interface SearchResult {
    id: number;
    bookId: string;
    title: string;
    author: string;
    summary: string;
    summaryLanguage: string;
    bookLanguage: string;
}

type SearchResults = SearchResult[];