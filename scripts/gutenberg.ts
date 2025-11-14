import {generateSummary} from "@/scripts/summary";
import "dotenv/config"

let ints = [16];

async function fetchGutenbergBooks() {
    let promises = ints.map(async (i) => {
        return fetch(`https://www.gutenberg.org/cache/epub/${i}/pg${i}.txt`)
    });
    let results = await Promise.all(promises);
    let text = await Promise.all(results.map(r => r.text()));

    let json = await Promise.all(text.map(t => generateSummary(t)))

    console.log(json)
}

fetchGutenbergBooks().then(() => console.log("done"));