import React from "react";

import type {Metadata} from "next";
import {prisma} from "@/lib/prisma";


export async function generateMetadata({params}: {
    params: Promise<{ book_id: string; lang: string }>
}): Promise<Metadata> {
    const {book_id, lang} = await params;
    const book = await prisma.book.findFirst({
        where: {book_id: book_id, summaryLanguage: lang},
    });

    if (!book) {
        return {
            title: "Book Not Found",
            description: "This summary does not exist",
        };
    }
    let title;
    const description = book.summary;
    switch (lang) {
        case "en":
        default: {
            title = `${book.title}: Chapter Summaries and Analysis`;
            break;
        }
        case "de": {
            title = `${book.title}: Kapitel-Zusammenfassungen und Analysen`;
            break;
        }
        case "fr": {
            title = `${book.title}: résumé par chapitre et analyse`;
            break;
        }
    }

    return {
        title,
        description,
        alternates: {
            languages: {
                en: `/summary/${book_id}/en`,
                de: `/summary/${book_id}/de`,
                fr: `/summary/${book_id}/fr`,
            },
        },
        openGraph: {
            title,
            description,
            type: "article",
            url: `/summary/${book_id}/${lang}`,
        },
        twitter: {
            title,
            description,
            card: "summary_large_image",
        },
    };
}

export default function SummaryLayout({children}: { children: React.ReactNode }) {
    return <div className="flex flex-col grow min-h-0">
        <div className={"flex flex-row mt-5d grow min-h-0"}>
            <div className={"flex-3 flex min-h-0"}>
                {children}
            </div>
        </div>
    </div>
}
