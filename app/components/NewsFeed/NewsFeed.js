import Link from 'next/link';
import PostImage from '../PostImage';
import styles from './NewsFeed.module.css';

export default function NewsFeed({ posts }) {
  if (!posts || posts.length === 0) {
    return <p className={styles.empty}>Nenhuma notícia encontrada.</p>;
  }

  return (
    <div className={styles.grid}>
      {posts.map((post) => (
        <Link key={post.id} href={`/noticias/${post.slug}`} className={styles.cardLink}>
          <article className={styles.card}>
            
            {/* Imagem */}
            <div className={styles.imageWrapper}>
              <PostImage
                src={post.image}
                alt={post.title}
                className={styles.image}
                fill // Carrega só quando aparece na tela (lazy é o padrão)
                sizes="(min-width: 768px) 50vw, 100vw" // 2 colunas a partir de 768px
              />
              <span className={styles.categoryTag}>{post.category}</span>
            </div>

            {/* Textos */}
            <div className={styles.cardBody}>
              <span className={styles.date}>{post.date}</span>
              <h3 className={styles.title}>{post.title}</h3>
              <p className={styles.excerpt}>{post.summary}</p>
            </div>

          </article>
        </Link>
      ))}
    </div>
  );
}