// components/TeamGrid.js
import Image from 'next/image';
import styles from './TeamGrid.module.css';

export default function TeamGrid({ members }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Nossa Equipe</h2>
      <div className={styles.grid}>
        {members.map((member, index) => (
          <div key={index} className={styles.card}>
            
            <div className={styles.imageWrapper}>
              {member.foto ? (
                <Image 
                  src={member.foto} 
                  alt={member.nome} 
                  width={150} 
                  height={150} 
                  className={styles.image} 
                />
              ) : (
                <div className={styles.placeholderIcon}>👤</div>
              )}
            </div>

            <h3 className={styles.name}>{member.nome}</h3>
            <span className={styles.role}>{member.cargo}</span>
            
          </div>
        ))}
      </div>
    </section>
  );
}