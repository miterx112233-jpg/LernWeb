const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = '/LernWeb';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  ...(isGithubActions
    ? {
        output: 'export',
        basePath: repoName,
        assetPrefix: `${repoName}/`,
        trailingSlash: true,
        images: {
          unoptimized: true
        },
        env: {
          NEXT_PUBLIC_BASE_PATH: repoName
        }
      }
    : {
        env: {
          NEXT_PUBLIC_BASE_PATH: ''
        }
      })
};

export default nextConfig;
