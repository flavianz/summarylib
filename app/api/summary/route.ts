import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";


export async function GET(request: Request) {
    const {searchParams} = new URL(request.url);
    const bookId = searchParams.get('bookId');
    if (!bookId) return new Response("No bookId provided", {status: 400})
    const summary = await prisma.book.findFirst({where: {book_id: bookId}, include: {chapters: true}});
    return NextResponse.json(summary);
}