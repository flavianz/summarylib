import {fetchGutenbergBooks} from "@/scripts/gutenberg";
import {PrismaClient} from "@/generated/prisma/client";

const prisma = new PrismaClient()

let ints = [17362];

async function main() {
    const books = await fetchGutenbergBooks(ints);

    for (const b of books as any[]) {
        console.log("Uploading book: ", b?.title, " by ", b?.author, "");
        const scalarData = {
            title: b?.title,
            author: b?.author,
            summary: b?.summary,
            analysis: b?.analysis,
            // default to 'en' if the model didn’t provide a language
            language: b?.language ?? 'en',
        };

        // find existing book by title + author, or create it
        let book = await prisma.book.findFirst({
            where: {title: scalarData.title, author: scalarData.author}
        });
        if (!book) {
            console.log(`Creating book: ${scalarData.title} by ${scalarData.author}`);
            book = await prisma.book.create({data: scalarData});
        } else {
            console.log("Book already exists, skipping: ", scalarData.title, " by ", scalarData.author, "")
        }

        // insert chapters, linking to the book
        const chapters = Array.isArray(b?.chapters) ? b.chapters : [];
        if (chapters.length > 0) {
            const chapterRows = chapters.map((chapter: any, idx: number) => {
                const chapterTitle = chapter?.title ?? chapter?.name ?? `Chapter ${idx + 1}`;
                return {
                    book_id: book!.id,
                    number: typeof chapter?.number === 'number' ? chapter.number : idx + 1,
                    name: chapterTitle,
                    summary: chapter?.summary ?? ''
                };
            });
            await prisma.chapter.createMany({data: chapterRows, skipDuplicates: true});
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