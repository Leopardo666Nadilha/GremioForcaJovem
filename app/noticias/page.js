import { getSiteData } from '@/lib/googleSheets';
import NewsList from './NewsList';
import { Suspense } from 'react';
import styles from './Noticias.module.css';

// Atualiza a cada 60 segundos se houver novos posts
export const revalidate = 60;

export default async function NoticiasPage() {
  // Busca os dados da planilha
  const { featuredPost, feedPosts } = await getSiteData();

  // Junta o Destaque com o Feed para ter a lista COMPLETA de histórico
  // Se não tiver destaque, usa array vazio para evitar erro
  const allPosts = featuredPost ? [featuredPost, ...feedPosts] : feedPosts;

  return (
    <main className={styles.container}>
      <Suspense fallback={<p>Carregando notícias...</p>}>
        <NewsList allPosts={allPosts} />
      </Suspense>
    </main>
  );
}