'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import styles from './Header.module.css';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  // Hook para saber a página atual
  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`${styles.header} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.container}>
        
        {/* ESQUERDA: Logo */}
        <Link href="/" className={styles.logoWrapper}>
          <Image 
            src="/Logo-colorido-branco.png"
            alt="Logo Força Jovem"
            width={300}
            height={100}
            className={styles.logoImage}
            priority
          />
        </Link>

        {/* CENTRO: Navegação Desktop (Novo) */}
        <nav className={styles.desktopNav}>
          <Link href="/" className={`${styles.navLink} ${isActive('/') ? styles.activeLink : ''}`}>
            Início
          </Link>
          <Link href="/noticias" className={`${styles.navLink} ${isActive('/noticias') ? styles.activeLink : ''}`}>
            Notícias
          </Link>
          <Link href="/agenda" className={`${styles.navLink} ${isActive('/agenda') ? styles.activeLink : ''}`}>
            Agenda
          </Link>
          <Link href="/sobre" className={`${styles.navLink} ${isActive('/sobre') ? styles.activeLink : ''}`}>
            Sobre
          </Link>
        </nav>

        {/* DIREITA: Botão CTA */}
        <Link href="/fazer-parte" className={styles.ctaButton}>
          Junte-se a nós!
        </Link>

      </div>
    </header>
  );
}