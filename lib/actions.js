'use server';

import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function enviarOuvidoria(formData) {
  try {
    // --- 1. PROTEÇÃO ANTI-BOT (HONEYPOT) ---
    // Tenta pegar o valor do campo escondido
    const honeypot = formData.get('nometruque');

    // Se o campo tiver qualquer valor, é um bot!
    if (honeypot) {
      console.warn('Bot detectado e bloqueado! 🤖 Tentativa ignorada.');
      // Retornamos true para enganar o bot (ele acha que enviou), 
      // mas NÃO salvamos na planilha para não sujar seus dados.
      return { success: true }; 
    }
    // ----------------------------------------

    // 2. Pegar os dados reais do formulário
    const tipo = formData.get('tipo');
    const mensagem = formData.get('mensagem');
    const data = new Date().toLocaleString('pt-BR');

    // Validação extra: Impede envio se a mensagem estiver vazia
    if (!mensagem || mensagem.trim() === '') {
        return { success: false, error: 'A mensagem não pode estar vazia.' };
    }

    // 3. Conectar na Planilha Google Sheets
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    // 4. Selecionar a aba 'Ouvidoria'
    const sheet = doc.sheetsByTitle['Ouvidoria'];
    
    // 5. Adicionar a linha (Só chega aqui se for humano)
    await sheet.addRow({
      data,
      tipo,
      mensagem,
    });

    return { success: true };

  } catch (error) {
    console.error('Erro na Ouvidoria:', error);
    return { success: false, error: 'Erro ao salvar.' };
  }
}

export async function enviarInscricao(formData) {
  try {
    // 1. HONEYPOT (Anti-bot)
    const honeypot = formData.get('nometruque');
    if (honeypot) {
      return { success: true }; // Engana o bot
    }

    // 2. Pegar dados
    const nome = formData.get('nome');
    const telefone = formData.get('telefone');
    const motivo = formData.get('motivo');
    const data = new Date().toLocaleString('pt-BR');

    // Validação simples
    if (!nome || !telefone || !motivo) {
      return { success: false, error: 'Preencha todos os campos.' };
    }

    // 3. Conectar
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    // 4. Salvar na aba 'Inscricoes'
    const sheet = doc.sheetsByTitle['Inscricoes'];
    
    await sheet.addRow({
      data,
      nome,
      telefone,
      motivo,
    });

    return { success: true };

  } catch (error) {
    console.error('Erro na Inscrição:', error);
    return { success: false, error: 'Erro ao salvar.' };
  }
}