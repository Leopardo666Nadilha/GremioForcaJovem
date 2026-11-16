import Image from 'next/image';
import { isOptimizableImage } from '@/lib/imageHosts';

// Imagem das notícias. As URLs vêm da planilha, então podem ser de qualquer site:
// - Domínios liberados em lib/imageHosts.js são otimizados pelo Next.js
// - Outros domínios são exibidos sem otimização (em vez de quebrar a página)
export default function PostImage({ src, alt, ...props }) {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt || ''}
      unoptimized={!isOptimizableImage(src)}
      {...props}
    />
  );
}
