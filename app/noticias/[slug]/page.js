import { getSiteData } from '@/lib/googleSheets';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';

// Atualiza o cache a cada 60 segundos
export const revalidate = 60;

export async function generateMetadata({ params }) {
  const { slug } = await params; 

  const { featuredPost, feedPosts } = await getSiteData();
  const allPosts = featuredPost ? [featuredPost, ...feedPosts] : feedPosts;
  
  const post = allPosts.find((p) => p.slug === slug);

  if (!post) return { title: 'Notícia não encontrada' };

  return {
    title: `${post.title} | Grêmio Força Jovem`,
    description: post.summary,
  };
}

export default async function NoticiaDetalhe({ params }) {
  const { slug } = await params; 

  // 1. Busca os dados
  const { featuredPost, feedPosts } = await getSiteData();
  const allPosts = featuredPost ? [featuredPost, ...feedPosts] : feedPosts;

  // 2. Encontra a notícia pelo Slug extraído
  const post = allPosts.find((p) => p.slug === slug);

  // 3. Se não existir, 404
  if (!post) {
    notFound();
  }

  return (
    <main className={styles.container}>
      
      <div className={styles.backButtonWrapper}>
        <Link href="/noticias" className={styles.backButton}>
          ← Voltar
        </Link>
      </div>

      <article className={styles.article}>
        
        <header className={styles.header}>
          <div className={styles.meta}>
            <span className={styles.category}>{post.category}</span>
            <span className={styles.date}>{post.date}</span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
        </header>

        <div className={styles.imageWrapper}>
          <img 
            src={post.image} 
            alt={post.title} 
            className={styles.image} 
          />
        </div>

        <div className={styles.content}>
          {post.content || post.summary} 
        </div>

      </article>
    </main>
  );
}