/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["siteapi.dramcode.top", "localhost:3005"],
  },
  generateBuildId: async () => {
    return process.env.GIT_HASH || 'default-build-id';
  },
};

export default nextConfig;