/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // --- ADICIONE ESTE BLOCO ---
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      // ---------------------------
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
