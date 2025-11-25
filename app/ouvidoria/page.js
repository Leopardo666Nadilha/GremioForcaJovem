'use client';

import { useState } from 'react';
import { enviarOuvidoria } from '@/lib/actions';
import styles from './Ouvidoria.module.css';

export default function OuvidoriaPage() {
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');

    const formData = new FormData(event.target);
    const result = await enviarOuvidoria(formData);

    if (result.success) {
      setStatus('success');
      event.target.reset(); // Limpa o formulário
    } else {
      setStatus('error');
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.content}>
        
        <h1 className={styles.title}>Ouvidoria Anônima</h1>
        <p className={styles.subtitle}>
          Este é um espaço seguro. Sua identidade é preservada. 
          Use este canal para enviar sugestões, críticas ou denúncias para o Grêmio.
        </p>

        {status === 'success' ? (
          <div className={styles.successMessage}>
            <h3>Mensagem Enviada! 🚀</h3>
            <p>Obrigado por contribuir. O Grêmio lerá sua mensagem com atenção.</p>
            <button onClick={() => setStatus('idle')} className={styles.buttonOutline}>
              Enviar outra mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            
            <div className={styles.inputGroup}>
              <label htmlFor="tipo" className={styles.label}>Sobre o que você quer falar?</label>
              <select name="tipo" id="tipo" className={styles.select} required>
                <option value="Sugestão">💡 Sugestão</option>
                <option value="Crítica">⚠️ Crítica / Problema</option>
                <option value="Elogio">👏 Elogio</option>
                <option value="Outro">💬 Outro</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="mensagem" className={styles.label}>Sua mensagem</label>
              <textarea 
                name="mensagem" 
                id="mensagem" 
                rows="6" 
                className={styles.textarea} 
                placeholder="Digite aqui... Não precisa se identificar."
                required
              ></textarea>
            </div>

            {/* --- ARMADILHA HONEYPOT --- */}
            {/* O CSS esconde isso. O usuário não vê. O bot vê e preenche. */}
            <input 
                type="text" 
                name="nometruque" 
                className={styles.honeypot} 
                tabIndex="-1" 
                autoComplete="off"
            />

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Enviando...' : 'Enviar Anônimamente'}
            </button>

            {status === 'error' && (
              <p className={styles.errorText}>Ocorreu um erro. Tente novamente.</p>
            )}
          </form>
        )}

      </div>
    </main>
  );
}