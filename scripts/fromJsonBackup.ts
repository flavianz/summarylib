import fs from "node:fs";
import {Book} from "@/scripts/summary";

export function getJsonBackupBook(path: string): Book[] {
    const data = fs.readFileSync(path, 'utf8');

    return Array.of(JSON.parse(data) as Book);
}