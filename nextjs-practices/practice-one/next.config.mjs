/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's7d1.scene7.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
};

export default nextConfig;
