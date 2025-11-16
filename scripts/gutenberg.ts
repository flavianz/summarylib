import {generateSummary} from "@/scripts/summary";
import "dotenv/config"

export async function fetchGutenbergBooks(indices: number[]) {
    let promises = indices.map(async (i) => {
        return fetch(`https://www.gutenberg.org/cache/epub/${i}/pg${i}.txt`)
    });
    let results = await Promise.all(promises);
    let text = await Promise.all(results.map(r => r.text()));

    return await Promise.all(text.map(t => generateSummary(t)));
}