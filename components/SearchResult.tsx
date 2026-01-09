"use client"

import BookmarkButton from "@/components/BookmarkButton";
import {useRouter} from "next/navigation";

export default function SearchResult({book, subkey}: { book: SearchResult, subkey: number }) {
    const router = useRouter();
    return <div onClick={() => router.push(`/summary/${book.book_id}/${book.summaryLanguage}`)} key={subkey}>
        <div className="border border-gray-300 hover:shadow-sm rounded-xl p-4 m-4 hover:cursor-pointer">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center">
                    <h2 className="font-bold text-xl pr-4 text">{book.title}</h2>
                    <h4 className="text-lg">{book.author}</h4>
                </div>
                <div className="flex items-center gap-3"><p
                    className="text-gray-500">{book.summaryLanguage.toUpperCase()}</p>
                    <BookmarkButton bookmark={{
                        book_id: book.book_id,
                        lang: book.summaryLanguage,
                    }}/>
                </div>
            </div>
            <p className="line-clamp-1 text-gray-700">{book.summary}</p></div>
    </div>
}