import {getSummaryById, getSummaryByUuidAndLang} from "@/lib/queries";
import SummaryView from "@/app/summary/SummaryView";

export default async function Summary({searchParams}: {
    searchParams: Promise<{ [_: string]: string | string[] | undefined }>
}) {
    const idString = (await searchParams).id;
    const uuidString = (await searchParams).uuid;

    let summary;
    if (idString && idString !== "" && typeof idString === "string") {
        const id = parseInt(idString);
        if (isNaN(id)) return <div>Invalid id</div>;
        summary = await getSummaryById(id);
    } else if (uuidString && uuidString !== "" && typeof uuidString === "string") {
        const [uuid, lang] = uuidString.split(";");
        summary = await getSummaryByUuidAndLang(uuid, lang);
    } else {
        return <div>No id or uuid provided</div>;
    }

    if (!summary) return <div>Invalid id</div>;
    return <SummaryView summary={summary}/>;
}

