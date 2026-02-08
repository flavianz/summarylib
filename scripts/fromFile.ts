import {generateSummary} from "@/scripts/summary";
import * as fs from "node:fs";

export async function getFileBook(path: string) {
    const data = fs.readFileSync(path, 'utf8');

    return await generateSummary(data);
}