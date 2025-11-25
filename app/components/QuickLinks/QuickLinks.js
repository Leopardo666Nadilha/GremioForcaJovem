import Link from 'next/link';
import styles from './QuickLinks.module.css';

export default function QuickLinks() {
  return (
    <section className={styles.container}>
      <h2 className={styles.sectionTitle}>Acesso Rápido</h2>
      
      <div className={styles.grid}>
        
        {/* 1. Agenda */}
        <Link href="/agenda" className={styles.item}>
          <div className={`${styles.iconCircle} ${styles.agendaCircle}`}>
            {/* Ícone Calendário */}
            <svg className={`${styles.icon} ${styles.agendaIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
          </div>
          <span className={styles.label}>Agenda</span>
        </Link>

        {/* 2. Esportes (Interclasse) */}
        <Link href="/noticias?categoria=Esportes" className={styles.item}>
          <div className={`${styles.iconCircle} ${styles.sportsCircle}`}>
            {/* Ícone Bola de Futebol */}
            <svg className={`${styles.icon} ${styles.sportsIcon}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* Círculo Externo */}
              <circle cx="12" cy="12" r="9" />
              {/* Pentágono Central */}
              <path d="M12 7l4.76 3.45l-1.82 5.55h-5.88l-1.82 -5.55z" />
              {/* Linhas conectando às bordas */}
              <path d="M12 7v-4" />
              <path d="M6.94 10.45l-3.44 -2" />
              <path d="M17.06 10.45l3.44 -2" />
              <path d="M14.94 16l3.44 2" />
              <path d="M9.06 16l-3.44 2" />
            </svg>
          </div>
          <span className={styles.label}>Esportes</span>
        </Link>

        {/* 3. Ouvidoria (Denúncias/Sugestões) */}
        <Link href="/ouvidoria" className={styles.item}>
          <div className={`${styles.iconCircle} ${styles.speakCircle}`}>
            {/* Ícone Megafone */}
            <svg className={`${styles.icon} ${styles.speakIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              {/* O Cone Principal (Corpo do Megafone) */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 11l16-5v12l-16-5v-2z" />
              {/* A Alça Curva (Onde segura) */}
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.5 16.5a3 3 0 11-5.8-1.6" />
            </svg>
          </div>
          <span className={styles.label}>Ouvidoria</span>
        </Link>

        {/* 4. Sobre (O Grêmio) */}
        <Link href="/sobre" className={styles.item}>
          <div className={`${styles.iconCircle} ${styles.aboutCircle}`}>
            {/* Ícone Grupo de Pessoas */}
            <svg className={`${styles.icon} ${styles.aboutIcon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <span className={styles.label}>O Grêmio</span>
        </Link>

      </div>
    </section>
  );
}