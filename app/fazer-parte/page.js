'use client';

import { useState } from 'react';
import { enviarInscricao } from '@/lib/actions';
import styles from './Fazer-parte.module.css';

export default function FazerPartePage() {
  const [status, setStatus] = useState('idle');

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('loading');

    const formData = new FormData(event.target);
    const result = await enviarInscricao(formData);

    if (result.success) {
      setStatus('success');
      event.target.reset();
    } else {
      setStatus('error');
    }
  }

  return (
    <main className={styles.container}>
      <div className={styles.wrapper}>
        
        <div className={styles.header}>
          <h1 className={styles.title}>Faça Parte da Equipe</h1>
          <p className={styles.subtitle}>
            Quer ajudar a transformar a nossa escola? O Grêmio está sempre buscando novas ideias e pessoas dispostas a fazer a diferença. Preencha o formulário e entraremos em contato.
          </p>
        </div>

        {status === 'success' ? (
          <div className={styles.successCard}>
            <h3>Inscrição Recebida! 🚀</h3>
            <p>Ficamos felizes com seu interesse. Vamos analisar seu perfil e te chamar no WhatsApp em breve.</p>
            <button onClick={() => setStatus('idle')} className={styles.buttonOutline}>
              Voltar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.formCard}>
            
            {/* Campo Nome */}
            <div className={styles.inputGroup}>
              <label htmlFor="nome" className={styles.label}>Nome Completo</label>
              <input 
                type="text" 
                name="nome" 
                id="nome" 
                className={styles.input} 
                placeholder="Ex: João da Silva" 
                required 
              />
            </div>

            {/* Campo Telefone */}
            <div className={styles.inputGroup}>
              <label htmlFor="telefone" className={styles.label}>WhatsApp / Telefone</label>
              <input 
                type="tel" 
                name="telefone" 
                id="telefone" 
                className={styles.input} 
                placeholder="(47) 99999-9999" 
                required 
              />
            </div>

            {/* Campo Motivo */}
            <div className={styles.inputGroup}>
              <label htmlFor="motivo" className={styles.label}>Por que você quer entrar no Grêmio?</label>
              <textarea 
                name="motivo" 
                id="motivo" 
                rows="5" 
                className={styles.textarea} 
                placeholder="Conte um pouco sobre suas ideias e vontade de ajudar..." 
                required
              ></textarea>
            </div>

            {/* Honeypot (Anti-bot) */}
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
              {status === 'loading' ? 'Enviando...' : 'Enviar Inscrição'}
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