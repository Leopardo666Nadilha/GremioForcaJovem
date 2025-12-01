import Image from 'next/image';
import { getEquipeData } from '@/lib/actions';
import TeamGrid from '../components/TeamGrid/TeamGrid';
import styles from './Sobre.module.css';

export const metadata = {
  title: 'Grêmio Força Jovem',
  description: 'Conheça a história, missão e visão do Grêmio Estudantil Força Jovem.',
};

export default async function SobrePage() {
  // Busca os dados da equipe
  const members = await getEquipeData();
  return (
    <main className={styles.container}>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Quem Somos</h1>
        <p className={styles.subtitle}>
          Conheça a essência, os valores e o propósito que movem a gestão do Grêmio Estudantil Força Jovem.
        </p>
      </div>

      {/* --- FOTO DA EQUIPE --- */}
      <section className={styles.teamSection}>
        <div className={styles.teamImageWrapper}>
          <div className={styles.teamImageOverlay}></div>
          <Image 
            src="/Grêmio.jpg"
            alt="Foto da Gestão 2024 Força Jovem"
            width={1000}
            height={600}
            className={styles.teamImage}
            priority
          />
        </div>
        <p className={styles.teamCaption}>Gestão Força Jovem 2024</p>
      </section>

      <div className={styles.grid}>
        
        {/* CARD 1: HISTÓRIA */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            {/* Ícone de Livro/História */}
            <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Nossa História
          </h2>
          <p className={styles.cardText}>
            O Grêmio Estudantil <strong>Força Jovem</strong>, da EEB Alinor Vieira Corte, em sua gestão atual eleita em 2024, dá continuidade a uma trajetória de protagonismo estudantil já existente na escola. A cada eleição, novos representantes assumem o compromisso de fortalecer a voz dos alunos, garantindo espaços de diálogo, participação e união. Esta gestão surge com o propósito de valorizar a história construída pelas gestões anteriores e de inovar com projetos que ampliem a integração entre os estudantes e a comunidade escolar.
          </p>
        </div>

        {/* CARD 2: MISSÃO */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            {/* Ícone de Alvo/Missão */}
            <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            Missão
          </h2>
          <p className={styles.cardText}>
            Defender os interesses dos alunos da EEB Alinor Vieira Corte, promovendo iniciativas que incentivem a cidadania, a cultura, o esporte, o lazer, a solidariedade e o respeito, de modo a fortalecer a convivência escolar e o papel transformador dos estudantes.
          </p>
        </div>

        {/* CARD 3: VISÃO */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>
            {/* Ícone de Olho/Visão */}
            <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Visão
          </h2>
          <p className={styles.cardText}>
            Acreditamos em uma escola onde todos têm voz, e trabalhamos para que cada aluno sinta-se parte fundamental na tomada de decisões que afetam seu cotidiano. Queremos ser referência em engajamento e transformação positiva no ambiente escolar.
          </p>
        </div>

        {/* CARD 4: ATUAÇÃO (Largo) */}
        <div className={`${styles.card} ${styles.wideCard}`}>
          <h2 className={styles.cardTitle}>
            {/* Ícone de Conexão/Engrenagem */}
            <svg className={styles.icon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
            Atuação e Transparência
          </h2>
          <div className={styles.cardText}>
            <p style={{ marginBottom: '1rem' }}>
              O Grêmio Estudantil é um dos conselhos que compõem a estrutura participativa da escola, representando a voz e os interesses dos estudantes. Atua de forma autônoma e independente em suas decisões, exercendo o protagonismo juvenil e a cidadania ativa.
            </p>
            <p style={{ marginBottom: '1rem' }}>
              Mesmo com essa autonomia, o Grêmio mantém uma relação de parceria e cooperação com os demais conselhos escolares — como a <strong>Associação de Pais e Professores (APP)</strong> e o <strong>Conselho Deliberativo Escolar (CDE)</strong> —, bem como com a equipe gestora e pedagógica.
            </p>
            <p>
              Juntos, esses segmentos trabalham para promover o diálogo, fortalecer a participação democrática e desenvolver ações que contribuam para o bem-estar coletivo e para a construção de uma escola cada vez mais inclusiva, acolhedora e comprometida com a formação integral de seus estudantes.
            </p>
          </div>
        </div>
      </div>
      {/* GRID DA EQUIPE */}
      <TeamGrid members={members} />
    </main>
  );
}