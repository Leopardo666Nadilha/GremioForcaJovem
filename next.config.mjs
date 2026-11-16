import { ALLOWED_IMAGE_HOSTS } from './lib/imageHosts.js';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Para liberar um novo domínio de imagens, edite lib/imageHosts.js
    remotePatterns: ALLOWED_IMAGE_HOSTS.map((hostname) => ({
      protocol: 'https',
      hostname,
    })),
  },
  reactCompiler: true,
};

export default nextConfig;
