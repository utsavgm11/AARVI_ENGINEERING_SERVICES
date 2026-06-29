/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [25, 50, 75, 95, 100], // Explicitly allow 95
  },
};

export default nextConfig;