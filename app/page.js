import Hero from './components/Hero/Hero';
import QuickLinks from './components/QuickLinks/QuickLinks';
import FeaturedNews from './components/FeaturedNews/FeaturedNews';
import NewsFeed from './components/NewsFeed/NewsFeed';
import { getSiteData } from '@/lib/googleSheets';
import styles from './page.module.css';

export const revalidate = 60; // ISR: Revalida a cada 60 segundos

export default async function Home() {
  const { featuredPost, feedPosts } = await getSiteData();

  const recentNews = feedPosts.slice(0, 4); // Pega as 4 notícias mais recentes

  return (
    <main className={styles.main}>
      
      <Hero />
      
      {/* QuickLinks: Abaixo do Hero */}
      <div className={styles.quickLinksWrapper}>
        <QuickLinks />
      </div>

      {/* FeaturedNews: Abaixo dos QuickLinks */}
      {featuredPost && (
        <div className={styles.featuredWrapper}>
          <FeaturedNews post={featuredPost} />
        </div>
      )}

      {/* Últimas Notícias e o Feed */}
      <div className={styles.feedContainer}>
        <h2 className={styles.sectionTitle}>
          Últimas Notícias
        </h2>
        {/* Passa as outras notícias para o Feed */}
        <NewsFeed posts={recentNews} />
      </div>

    </main>
  );
}