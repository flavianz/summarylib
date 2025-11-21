"use client"
import wordmark from "@/public/logos/workmark.svg"
import Image from "next/image";
import {useRouter} from "next/navigation";

export default function Wordmark() {
    const router = useRouter();
    return <Image src={wordmark} alt="Workmark" width={180} className="p-5 hover:cursor-pointer"
                  onClick={() => router.push("/")}/>
}