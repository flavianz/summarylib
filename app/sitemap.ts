import {prisma} from "@/lib/prisma";
import {MetadataRoute} from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const books = await prisma.book.findMany({
        select: {book_id: true, uploadedAt: true, summaryLanguage: true},
    });

    return books.map((book) => ({
        url: `https://summarylib.org/summary/${book.book_id}/${book.summaryLanguage}`,
        lastModified: book.uploadedAt,
        changeFrequency: "monthly",
        alternates: {
            languages: {
                en: `https://summarylib.org/summary/${book.book_id}/en`,
                fr: `https://summarylib.org/summary/${book.book_id}/fr`,
                de: `https://summarylib.org/summary/${book.book_id}/de`,
            },
        },
    }));
}