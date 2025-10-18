import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Update this with your GitHub username and repo name
  // basePath: '/REPO-NAME',
  // assetPrefix: '/REPO-NAME/',
};

export default withBundleAnalyzer(nextConfig);
