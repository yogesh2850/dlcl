/** @type {import('next').NextConfig} */
const basePath = '/dlcl';

const nextConfig = {
  basePath,
  assetPrefix: `${basePath}/`,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  output: 'export',
  reactStrictMode: true,
  distDir: 'docs',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
