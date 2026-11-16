import Link from 'next/link';
import PostImage from '../PostImage';
import styles from './FeaturedNews.module.css';

export default function FeaturedNews({ post }) {
  // Se a planilha estiver vazia ou carregando, não mostra nada para não quebrar o layout
  if (!post) return null;

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <Link href={`/noticias/${post.slug}`} className={styles.link}>
          <article className={styles.card}>
            
            {/* Tag de "Em Alta" ou Categoria */}
            <div className={styles.badge}>
              🔥 Destaque
            </div>

            {/* Imagem de Fundo */}
            <div className={styles.imageContainer}>
              <PostImage
                src={post.image}
                alt={post.title}
                className={styles.image}
                fill
                preload // Destaque aparece no topo: carrega primeiro
                sizes="(min-width: 768px) 55vw, 100vw"
              />
              {/* Degradê para o texto ficar legível em cima da foto */}
              <div className={styles.overlay}></div>
            </div>

            {/* Conteúdo */}
            <div className={styles.content}>
              <span className={styles.category}>{post.category}</span>
              <h2 className={styles.title}>{post.title}</h2>
              <p className={styles.summary}>{post.summary}</p>
              
              <div className={styles.readMore}>
                Ler notícia completa 
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></svg>
              </div>
            </div>

          </article>
        </Link>
      </div>
    </section>
  );
}