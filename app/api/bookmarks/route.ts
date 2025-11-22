import {prisma} from "@/lib/prisma";
import {NextRequest, NextResponse} from "next/server";
import {Bookmark} from "@/lib/bookmarks";

export async function getBookmarks(bookmarks: Bookmark[]): Promise<SearchResults> {
    const ids = bookmarks.map(f => f.book_id);
    const langs = bookmarks.map(f => f.lang);
    return prisma.$queryRaw`
        SELECT book_id, title, author, summary, "bookLanguage", "summaryLanguage"
        FROM "Book"
        WHERE (book_id, "summaryLanguage") IN (SELECT UNNEST(${ids}::uuid[]), UNNEST(${langs}::text[]));
    `;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const bookmarks: Bookmark[] = body.ids;

        if (!bookmarks || !Array.isArray(bookmarks)) {
            return NextResponse.json({error: "Invalid IDs"}, {status: 400});
        }

        const books = await getBookmarks(bookmarks);

        return NextResponse.json(books);
    } catch (err) {
        return NextResponse.json({error: "Something went wrong"}, {status: 500});
    }
}