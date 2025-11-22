"use client"
import Image from "next/image";
import bookmarkIcon from "@/public/bookmark.svg";

export default function BookmarksPageButton() {
    return <a href="/bookmarks"
              className="hover:cursor-pointer hover:bg-[#2b78491A] rounded-xl place-items-center flex justify-center items-center px-3 py-2 m-2 gap-2 mr-6">
        <Image src={bookmarkIcon} alt={"Bookmarks"} width={24}/>
        <p className="p-0 m-0">Bookmarks</p>
    </a>
}