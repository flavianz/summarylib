import {getSummaryById, getSummaryByUuidAndLang} from "@/lib/queries";
import SummaryView from "@/app/summary/[id]/SummaryView";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "SummaryLib | Summary",
};

export default async function Summary({params}: { params: Promise<{ id: string }> }) {
    const idString = (await params).id;

    let summary;
    if (idString && idString !== "") {
        if (idString.includes(".")) {
            const [uuid, lang] = idString.split(".");
            summary = await getSummaryByUuidAndLang(uuid, lang);
        } else {
            const id = parseInt(idString);
            if (isNaN(id)) return <div>Invalid id</div>;
            summary = await getSummaryById(id);
        }
    } else {
        return <div>No id or uuid provided</div>;
    }

    if (!summary) return <div>Invalid id</div>;
    return <SummaryView summary={summary}/>;
}

