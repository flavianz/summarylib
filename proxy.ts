import {NextRequest, NextResponse} from "next/server";

const CANONICAL_HOST = 'summarylib.org';

export function proxy(req: NextRequest) {
    const host = req.headers.get('host');

    if (host && host !== CANONICAL_HOST) {
        const url = req.nextUrl.clone();
        url.host = CANONICAL_HOST;
        url.protocol = 'https';

        return NextResponse.redirect(url, 301);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
};