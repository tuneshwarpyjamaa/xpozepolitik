/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        if (process.env.NODE_ENV === 'development') {
            return [
                {
                    source: '/api/:path*',
                    destination: 'http://localhost:4000/api/:path*',
                },
            ];
        }
        // In production, API routes are handled by Vercel's routing
        return [];
    },
    // Add environment variables that will be available on the client side
    env: {
        NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'development' 
            ? 'http://localhost:4000/api' 
            : '/api'
    }
};

export default nextConfig;
