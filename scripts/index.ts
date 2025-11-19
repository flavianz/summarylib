import {fetchGutenbergBooks} from "@/scripts/gutenberg";
import {PrismaClient} from "@/generated/prisma/client";
import {v4 as uuidv4} from 'uuid';
import {BookSummary} from "@/scripts/summary";
import {getFileBook} from "@/scripts/fromFile";

const prisma = new PrismaClient()

let ints = [1513];

async function main() {
    //const books = await fetchGutenbergBooks(ints);
    const books = await getFileBook("C:\\Users\\flavi\\Documents\\WebProjects\\summarylib\\scripts\\air.txt");

    for (const b of books) {
        const bookId = uuidv4();
        const bookLang = b.language;
        for (const langBook of (Object.entries(b).filter((entry) => typeof entry[1] !== "string") as [string, BookSummary][])) {
            const bookSummary = langBook[1];
            console.log("Uploading book: ", bookSummary.title, " by ", bookSummary.author, " in language: ", langBook[0], "");
            console.log(bookSummary);
            const scalarData = {
                book_id: bookId,
                title: bookSummary.title,
                author: bookSummary.author,
                summary: bookSummary.summary,
                analysis: bookSummary.analysis,
                // default to 'en' if the model didn’t provide a language
                bookLanguage: bookLang,
                summaryLanguage: langBook[0]
            };

            // find existing book by title + author, or create it
            let book = await prisma.book.findFirst({
                where: {title: scalarData.title, author: scalarData.author, summaryLanguage: langBook[0]}
            });
            if (!book) {
                console.log(`Creating book: ${scalarData.title} by ${scalarData.author} in language ${scalarData.summaryLanguage}`);
                book = await prisma.book.create({data: scalarData});
            } else {
                console.log("Book already exists, skipping: ", scalarData.title, " by ", scalarData.author, " in language: ", langBook[0],)
            }

            // insert chapters, linking to the book
            const chapters = bookSummary.chapters;
            if (chapters.length > 0) {
                const chapterRows = chapters.map((chapter, idx: number) => {
                    const chapterTitle = chapter.name ?? `Chapter ${idx + 1}`;
                    return {
                        book_id: bookId,
                        number: chapter.number,
                        name: chapterTitle,
                        summary: chapter.summary,
                        summaryLanguage: langBook[0]
                    };
                });
                await prisma.chapter.createMany({data: chapterRows, skipDuplicates: true});
            }
        }
    }

    console.log("done");
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })