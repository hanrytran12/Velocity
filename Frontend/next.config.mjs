/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'supersports.com.vn',
      },
      {
        protocol: 'https',
        hostname: 'cdn.hstatic.net',
      },


      {
        protocol: 'https',
        hostname: 'static.nike.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sneakerdaily.vn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'bizweb.dktcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.bizweb.dktcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.asics.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.asics.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
