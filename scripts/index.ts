import {fetchGutenbergBooks} from "@/scripts/gutenberg";
import {PrismaClient} from "@/generated/prisma/client";
import {v4 as uuidv4} from 'uuid';
import {Book, BookSummary} from "@/scripts/summary";
import {getFileBook} from "@/scripts/fromFile";
import {getJsonBackupBook} from "@/scripts/fromJsonBackup";

const prisma = new PrismaClient()

let ints = [730, 6498, 5322, 34811, 12108, 6079, 69944, 2054, 8126, 74008, 35312, 58238, 2413, 5711, 135, 64317, 1342, 19942, 9070, 2413, 798];

async function main() {
    //const books = await getFileBook("C:\\Users\\flavi\\Documents\\WebProjects\\summarylib\\scripts\\air.txt");
    //const books = getJsonBackupBook("C:\\Users\\flavi\\Documents\\WebProjects\\summarylib\\scripts\\air.txt");
    let count = 1;
    const retries = [];
    for (const index of ints) {
        try {
            const book = await fetchGutenbergBooks(index);
            await upload(book);
            console.log(`${count}/${ints.length} Uploaded ${book.en.title} by ${book.en.author} (${index})`)
        } catch (e) {
            retries.push(index);
            console.error(`Error at ${count}/${ints.length} (index ${index}): ${e}`)
        }
        count++;
    }
    console.log("Retries: ", retries);
    console.log("Uploaded all books!");
}

async function upload(book: Book) {
    const bookId = uuidv4();
    const bookLang = book.language;
    for (const langBook of (Object.entries(book).filter((entry) => typeof entry[1] !== "string") as [string, BookSummary][])) {
        const bookSummary = langBook[1];
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
        if (book) {
            console.log("Book already exists, skipping: ", scalarData.title, " by ", scalarData.author, " in language: ", langBook[0],)
            continue;
        }

        book = await prisma.book.create({data: scalarData});


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

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })