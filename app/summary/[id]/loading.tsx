import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "SummaryLib | Loading...",
};

export default function SummaryLoading() {
    return <div className="flex grow flex-row">
        <div className="flex-1"></div>
        <div className="flex-2 flex justify-center items-center">
            <div className="loader"></div>
        </div>
    </div>
}