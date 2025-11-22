"use client"
import {useEffect} from "react";

type AdBannerTypes = {
    dataAdSlot: string;
    dataAdFormat: string;
    dataFullWidthResponsive: boolean;
};

export default function AdBanner({dataAdSlot, dataAdFormat, dataFullWidthResponsive}: AdBannerTypes) {

    useEffect(() => {
        try {
            ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
        } catch (e) {
            console.error(e)
        }
    }, [])

    return <ins className="adsbygoogle"
                style={{
                    display: "block",
                }}
                data-ad-client="ca-pub-1921734779513180"
                data-ad-slot={dataAdSlot}
                data-ad-format={dataAdFormat}
                data-full-width-responsive={dataFullWidthResponsive.toString()}>
    </ins>;
}