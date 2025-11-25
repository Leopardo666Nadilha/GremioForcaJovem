import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function getSiteData() {
  try {

    const privateKey = process.env.GOOGLE_PRIVATE_KEY 
      ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') 
      : undefined;

    if (!privateKey || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
      // Isso evita que o build quebre na fase estática se as variáveis não existirem
      console.warn("⚠️ Credenciais do Google não encontradas. O build pode falhar se tentar acessar a API agora.");
    }
    // 1. Autenticação
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

    // 2. Carregar informações da planilha
    await doc.loadInfo();

    // 3. Ler as abas 'Posts' e 'Agenda'
    const sheetPosts = doc.sheetsByTitle['Posts'];
    const sheetAgenda = doc.sheetsByTitle['Agenda']; // <--- Nova aba

    // Carregar as linhas de ambas as abas em paralelo (mais rápido)
    const [rowsPosts, rowsAgenda] = await Promise.all([
      sheetPosts.getRows(),
      sheetAgenda.getRows(), // Se der erro aqui, verifique se a aba se chama exatamente "Agenda"
    ]);

    // --- PROCESSAMENTO DOS POSTS ---
    const posts = rowsPosts.map((row) => {
      const titulo = row.get('titulo') || '';
      
      // Geração de Slug Robusta
      const slug = titulo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');

      return {
        id: row.get('id'),
        title: titulo,
        date: row.get('data'),
        category: row.get('categoria'),
        image: row.get('imagem'),
        summary: row.get('resumo'),
        content: row.get('conteudo'),
        isFeatured: row.get('destaque') === 'TRUE',
        slug: slug, 
      };
    })
    .filter(post => post.id && post.title);

    // Separar Destaque do Resto
    const featuredPost = posts.find(post => post.isFeatured) || posts[posts.length - 1];
    const feedPosts = posts.filter(post => post.id !== featuredPost?.id).reverse();

    // --- PROCESSAMENTO DA AGENDA ---
    const agenda = rowsAgenda.map((row) => ({
      date: row.get('data'),
      event: row.get('evento'),
      type: row.get('tipo'),
    }));

    // 4. Retornar tudo
    return {
      featuredPost,
      feedPosts,
      agenda, // <--- Agora retornamos a agenda também
    };

  } catch (error) {
    console.error('Erro ao carregar planilha:', error);
    // Retorna arrays vazios para não quebrar o site se a planilha falhar
    return { featuredPost: null, feedPosts: [], agenda: [] };
  }
}