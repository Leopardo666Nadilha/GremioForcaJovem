import { getSiteData } from '@/lib/googleSheets';
import styles from './Agenda.module.css';

// Atualiza a cada hora
export const revalidate = 3600; 

// --- PALETA CYBERPUNK ---
const neonColors = [
  '#ef4444', // Vermelho
  '#06b6d4', // Ciano
  '#f59e0b', // Amarelo
  '#8b5cf6', // Violeta
  '#f43f5e', // Rosa
  '#10b981', // Esmeralda
  '#f97316', // Laranja
  '#3b82f6', // Azul Real
  '#d946ef', // Fúcsia
  '#84cc16', // Lima
];

export default async function AgendaPage() {
  const { agenda } = await getSiteData();

  // Função de Hashing "Caótica" (DJB2 Algorithm)
  // Esse algoritmo espalha muito mais os resultados
  const getColorForType = (str) => {
    if (!str) return '#94a3b8';

    let hash = 5381; // Número primo inicial (semente)

    for (let i = 0; i < str.length; i++) {
      // Hash * 33 + caractere
      // O uso de bitwise shift (<< 5) torna isso muito rápido e caótico
      hash = ((hash << 5) + hash) + str.charCodeAt(i); 
    }

    // Garante positivo e pega o resto
    const index = Math.abs(hash) % neonColors.length;
    return neonColors[index];
  };

  return (
    <main className={styles.container}>
      
      <div className={styles.header}>
        <h1 className={styles.title}>Agenda Escolar</h1>
        <p className={styles.subtitle}>
          Fique ligado nas datas e eventos importantes do Grêmio.
        </p>
      </div>

      <section className={styles.timeline}>
        
        {(!agenda || agenda.length === 0) ? (
          <p className={styles.empty}>Nenhum evento agendado no momento.</p>
        ) : (
          agenda.map((item, index) => {
            const color = getColorForType(item.type);
            
            return (
              <div 
                key={index} 
                className={styles.eventCard}
                style={{ '--event-color': color }}
              >
                {/* Data */}
                <div className={styles.dateBadge}>
                  📅 {item.date}
                </div>

                {/* Nome do Evento */}
                <h3 className={styles.eventName}>
                  {item.event}
                </h3>

                {/* Tipo (Colorido dinamicamente) */}
                <div className={styles.typeTag}>
                  <span 
                    className={styles.eventType}
                    style={{ 
                      color: color, 
                      borderColor: color, 
                      backgroundColor: `${color}15` 
                    }} 
                  >
                    • {item.type || 'Geral'}
                  </span>
                </div>
              </div>
            );
          })
        )}

      </section>
    </main>
  );
}
