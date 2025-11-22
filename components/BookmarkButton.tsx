"use client"
import bookmarkIcon from "@/public/bookmark.svg";
import bookmarkFilledIcon from "@/public/bookmark-filled.svg";
import Image from "next/image";
import {addBookmark, Bookmark, getBookmarks, removeBookmark} from "@/lib/bookmarks";
import {useEffect, useState} from "react";


export default function BookmarkButton({bookmark}: { bookmark: Bookmark }) {
    const [isBookmarked, setIsBookmarked] = useState(false);
    useEffect(() => {
        setIsBookmarked(getBookmarks().find(b => b.book_id === bookmark.book_id && b.lang === bookmark.lang) !== undefined);
    }, [])
    return <button
        className="hover:cursor-pointer hover:bg-[#2b78491A] rounded-3xl place-items-center w-[36px] h-[36px] flex justify-center items-center"
        onClick={(e) => {
            e.stopPropagation();
            let bookmarks = getBookmarks()
            if (bookmarks.find(b => b.book_id === bookmark.book_id && b.lang === bookmark.lang)) {
                // remove from bookmarks
                removeBookmark(bookmark)
                setIsBookmarked(false)
            } else {
                addBookmark(bookmark)
                setIsBookmarked(true)
            }
        }}>
        <Image src={isBookmarked ? bookmarkFilledIcon : bookmarkIcon} alt="Bookmark" width={24}/>
    </button>
}