import {getSummaryByUuidAndLang} from "@/lib/queries";
import SummaryView from "@/app/summary/[book_id]/[lang]/SummaryView";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "SummaryLib | Summary",
};

export default async function Summary({params}: { params: Promise<{ book_id: string; lang: string }> }) {
    const {book_id, lang} = await params;

    if (!book_id || !lang) return <div>No book id or language provided</div>;

    let summary = await getSummaryByUuidAndLang(book_id, lang);

    if (!summary) return <div>No book found with matching book id and language</div>;
    return <SummaryView summary={summary}/>;
}

