import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";


export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const search = searchParams.get('search');
    if (!search || search === "" || search === " ") return new Response("No search provided", {status: 400})

    const results = await prisma.$queryRaw`
        SELECT title, author, summary, "bookLanguage", "summaryLanguage"
        FROM "Book"
        WHERE title % ${search}
           OR author % ${search}
        ORDER BY similarity(title, ${search}) DESC LIMIT 10;
    `;
    return NextResponse.json(results);
}