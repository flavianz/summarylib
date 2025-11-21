import {prisma} from "@/lib/prisma";
import {wait} from "next/dist/lib/wait";

export async function getSearchResults(query: string): Promise<SearchResults> {
    await wait(10000);
    return prisma.$queryRaw`
        SELECT id, book_id, title, author, summary, "bookLanguage", "summaryLanguage"
        FROM "Book"
        WHERE title % ${query}
           OR author % ${query}
        ORDER BY similarity(title, ${query}) DESC LIMIT 10;
    `;
}

export async function getSummaryById(id: number) {
    return prisma.book.findUnique({where: {id: id}, include: {chapters: true}});
}

export async function getSummaryByUuidAndLang(uuid: string, lang: string) {
    return prisma.book.findFirst({where: {book_id: uuid, summaryLanguage: lang}, include: {chapters: true}});
}