'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import NewsFeed from '../components/NewsFeed/NewsFeed';
import styles from './Noticias.module.css';

export default function NewsList({ allPosts }) {
  const searchParams = useSearchParams();
  const categoriaUrl = searchParams.get('categoria'); // Pega o que está na URL (?categoria=...)

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  // Lista de categorias disponíveis
  const categories = ['Todas', ...new Set(allPosts.map(post => post.category).filter(Boolean))];

  // 2. Efeito que roda ao carregar a página para ler a URL
  useEffect(() => {
    if (categoriaUrl) {
      // Procura a categoria na lista (ignorando maiúsculas/minúsculas)
      // Ex: URL "esportes" encontra "Esportes" na lista de categorias
      const categoriaEncontrada = categories.find(
        cat => cat.toLowerCase() === categoriaUrl.toLowerCase()
      );

      if (categoriaEncontrada) {
        setSelectedCategory(categoriaEncontrada);
      }
    }
  }, [categoriaUrl]); // Roda sempre que a URL mudar

  // 3. Lógica de Filtragem (Mantém igual)
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.summary?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'Todas' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className={styles.wrapper}>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Todas as Notícias</h1>
        <p className={styles.subtitle}>Fique por dentro de tudo que acontece no Grêmio.</p>
      </div>

      <div className={styles.controls}>
        {/* Barra de Pesquisa */}
        <div className={styles.searchWrapper}>
          <svg className={styles.searchIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Pesquisar notícia..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Botões de Categoria */}
        <div className={styles.categories}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.activeCategory : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Se a lista filtrada estiver vazia, o próprio NewsFeed mostra a mensagem de erro */}
      <NewsFeed posts={filteredPosts} />
      
    </div>
  );
}