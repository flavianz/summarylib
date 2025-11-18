import {prisma} from "@/lib/prisma";

export async function getSearchResults(query: string): Promise<SearchResults> {
    return prisma.$queryRaw`
        SELECT id, book_id, title, author, summary, "bookLanguage", "summaryLanguage"
        FROM "Book"
        WHERE title % ${query}
           OR author % ${query}
        ORDER BY similarity(title, ${query}) DESC LIMIT 10;
    `;
}

export async function getBook(bookId: string) {
    return prisma.book.findFirst({where: {book_id: bookId}, include: {chapters: true}});
}