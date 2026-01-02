import {generateSummary} from "@/scripts/summary";
import "dotenv/config"

export async function fetchGutenbergBooks(index: number) {
    let response = await fetch(`https://www.gutenberg.org/cache/epub/${index}/pg${index}.txt`);
    let text = await response.text();

    if (text.length > 1024 * 1024) {
        return null;
    }

    return await generateSummary(text);
}