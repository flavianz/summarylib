import {getSummaryById} from "@/lib/queries";
import {useTabContext} from "@/app/summary/layout";
import SummaryView from "@/app/summary/SummaryView";

export default async function Summary({searchParams}: {
    searchParams: Promise<{ [_: string]: string | string[] | undefined }>
}) {
    const idString = (await searchParams).id;
    if (!idString || idString === "") {
        return <div>No id provided</div>;
    }
    if (typeof idString !== "string") {
        return <div>Invalid id</div>;
    }
    const id = parseInt(idString);
    if (isNaN(id)) return <div>Invalid id</div>;

    const summary = await getSummaryById(id);

    if (!summary) return <div>Invalid id</div>;
    return <SummaryView summary={summary}/>;
}

