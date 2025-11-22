"use client"
export type Bookmark = { book_id: string; lang: string };

export function getBookmarks(): Bookmark[] {
    if (!localStorage) {
        return [];
    }
    try {
        let local = localStorage.getItem("bookmarks");
        if (!local) {
            localStorage.setItem("bookmarks", JSON.stringify([]))
            local = "[]";
        }
        return JSON.parse(local) as Bookmark[];
    } catch (e) {
        if (localStorage) {
            localStorage.setItem("bookmarks", JSON.stringify([]))
        }
        return [];
    }
}

export function addBookmark(bookmark: Bookmark) {
    console.log(getBookmarks())
    localStorage.setItem("bookmarks", JSON.stringify([...getBookmarks(), bookmark]))
}

export function removeBookmark(bookmark: Bookmark) {
    localStorage.setItem("bookmarks", JSON.stringify(getBookmarks().filter(b => b.book_id !== bookmark.book_id)))
}