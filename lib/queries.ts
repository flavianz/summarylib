import {prisma} from "@/lib/prisma";
import {Bookmark} from "@/lib/bookmarks";
import {Prisma} from "@prisma/client/extension";

export async function getSearchResults(query: string): Promise<SearchResults> {
    return prisma.$queryRaw`
        SELECT book_id, title, author, summary, "bookLanguage", "summaryLanguage"
        FROM "Book"
        WHERE title % ${query}
           OR author % ${query}
        ORDER BY similarity(title, ${query}) DESC LIMIT 10;
    `;
}

export async function getBookmarks(bookmarks: Bookmark[]): Promise<SearchResults> {
    const ids = bookmarks.map(f => f.book_id);
    const langs = bookmarks.map(f => f.lang);
    return prisma.$queryRaw`
        SELECT book_id, title, author, summary, "bookLanguage", "summaryLanguage"
        FROM "Book"
        WHERE (id, "summaryLanguage") IN (SELECT UNNEST(${ids}::text[]), UNNEST(${langs}::text[]));
    `;
}

export async function getSummaryById(id: number) {
    return prisma.book.findUnique({where: {id: id}, include: {chapters: true}});
}

export async function getSummaryByUuidAndLang(uuid: string, lang: string) {
    return prisma.book.findFirst({where: {book_id: uuid, summaryLanguage: lang}, include: {chapters: true}});
}