import {GoogleGenAI} from "@google/genai";
import {z} from "zod";
import {zodToJsonSchema} from "zod-to-json-schema";
import "dotenv/config";
import {v4 as uuidv4} from 'uuid';
import * as fs from "node:fs";

export interface BookSummary {
    title: string;
    author: string;
    summary: string;
    analysis: string;
    chapters: ChapterSummary[];
}

interface ChapterSummary {
    number: number;
    name: string;
    summary: string;
}

export interface Book {
    de: BookSummary;
    en: BookSummary;
    fr: BookSummary;
    language: string;
}

const ai = new GoogleGenAI({apiKey: process.env.GENAI_API_KEY});

const chapterSummarySchema = z.object({
    number: z.number().describe("The number of the chapter (starting at 1)."),
    name: z.string().describe("The name of the chapter."),
    summary: z.string().describe("A detailed summary of the chapter.")
});

const bookSummarySchema = z.object({
    title: z.string().describe("The title of the book."),
    author: z.string().describe("The author of the book."),
    summary: z.string().describe("The summary should be about 500 - 750 words, depending on the length and content of the book. Insert line breaks where they fit to make it more readable. It should not contain any analysis or other thoughts, simply the plot."),
    analysis: z.string().describe("Give a brief analysis of the themes and other literary analysis"),
    chapters: z.array(chapterSummarySchema).describe("The chapters of the book. There should not be more than 50 items. If there are more than 50, start summarizing them in small batches.")
});

export const bookSchema = z.object({
    en: bookSummarySchema,
    de: bookSummarySchema,
    fr: bookSummarySchema,
    language: z.string().describe("The language of the book in the 2-character code (e.g. 'en' for english, 'de' for german"),
})


export async function generateSummary(content: string) {
    const prompt = `Write a summary of the book with the following text. ignore the license if there is one. provide the asked properties only using the content of the text provided (exception for the analysis): \n\n${content}`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(bookSchema),
        },
    });
    const book: Book = JSON.parse(response.text ?? "{}") as Book;
    const uuid = uuidv4();
    try {
        fs.writeFileSync(`./book_backups/${book.en.title}-${uuid}.json`, content);

    } catch (err) {
        console.error(err);
    }
    return book;
}