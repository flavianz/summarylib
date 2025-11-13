import Image from "next/image";
import SearchButton from "./searchButton";

export default function Home() {
    return (

        <main className="flex justify-center">
            <div
                className="border border-gray-300 shadow-[var(--secondary)] rounded-4xl flex justify-center pl-8 pt-2 pr-2 pb-2">
                <input type="text"
                       className="focus:outline-none focus:ring-0 border-transparent"/>
                <SearchButton/>
            </div>
        </main>
    );
}
