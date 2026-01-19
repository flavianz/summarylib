import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    turbopack: {
        root: __dirname,
    },
    async redirects() {
        return [
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'summarylib.flavianz.ch',
                    },
                ],
                destination: 'https://summarylib.org/:path*',
                permanent: true,
            },
        ]
    },
};

export default nextConfig;
