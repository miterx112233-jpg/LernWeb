const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const isProdBuild = process.env.NODE_ENV === 'production';
const repoName = '/LernWeb';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // แยกโฟลเดอร์ตอนรัน next build (.next-build) ไม่ให้เขียนทับ .next ของ next dev ที่กำลังรันอยู่!
  distDir: isGithubActions ? '.next' : isProdBuild ? '.next-build' : '.next',
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
