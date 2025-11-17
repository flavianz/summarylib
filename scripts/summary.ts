import {GoogleGenAI} from "@google/genai";
import {z} from "zod";
import {zodToJsonSchema} from "zod-to-json-schema";
import "dotenv/config";

interface Book {
    title: string;
    author: string;
    summary: string;
    analysis: string;
    chapters: Chapter[];
    language: string;
}

interface Chapter {
    number: number;
    name: string;
    summary: string;
}

const ai = new GoogleGenAI({apiKey: process.env.GENAI_API_KEY});

const chapterSchema = z.object({
    number: z.number().describe("The number of the chapter (starting at 1)."),
    title: z.string().describe("The title of the chapter. keep it short and concise."),
    summary: z.string().describe("A summary of the chapter. More detailed than the complete summary")
});

const bookSchema = z.object({
    title: z.string().describe("The title of the book."),
    author: z.string().describe("The author of the book."),
    summary: z.string().describe("The summary should be about 500 words (+-250 words, depending on the length and content of the book). It should not contain any analysis or other thoughts, simply the plot."),
    analysis: z.string().describe("Give a brief analysis of the themes and other literary analysis"),
    language: z.string().describe("The language of the book in the 2-character code (e.g. 'en' for english, 'de' for german").optional(),
    chapters: z.array(chapterSchema).describe("The chapters of the book.")
});

const summarySchema = z.array(bookSchema).describe("Write one summary in english, one in german and one in the language of the book you received.");


export async function generateSummary(content: string) {
    const prompt = `Write a summary of the book with the following text. ignore the license if there is one. provide the asked properties only using the content of the text provided (exception for the analysis): \n\n${content}`

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseJsonSchema: zodToJsonSchema(summarySchema),
        },
    });

    return JSON.parse(response.text ?? "{}") as Book[];
}