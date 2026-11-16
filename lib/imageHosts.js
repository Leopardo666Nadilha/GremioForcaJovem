// Domínios de onde o next/image pode otimizar imagens.
// Usado no next.config.mjs (remotePatterns) e no componente PostImage.
// Para liberar um novo site de imagens, basta adicionar o domínio aqui.
export const ALLOWED_IMAGE_HOSTS = [
  'drive.google.com',
  'lh3.googleusercontent.com',
  'i.imgur.com',
];

export function isOptimizableImage(src) {
  try {
    const url = new URL(src);
    return url.protocol === 'https:' && ALLOWED_IMAGE_HOSTS.includes(url.hostname);
  } catch {
    // URLs relativas (ex: /imagem.png, da pasta public) também são otimizáveis
    return typeof src === 'string' && src.startsWith('/');
  }
}
