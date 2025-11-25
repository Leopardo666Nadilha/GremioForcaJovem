import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import "./globals.css";
import Header from './components/Header/Header';
import BottomNav from './components/BottomNav/BottomNav';

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: "Grêmio Estudantil",
  description: "Grêmio estudantil Força Jovem - Escola de Educação Básica Alinor Vieira Côrte",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className="...">
        
        <Header /> {/* Topo Fixo (Logo + CTA) */}
        
        <main className="main-content">
          {children}
        </main>

        <BottomNav /> {/* Rodapé Fixo (Navegação) */}
        
      </body>
    </html>
  );
}
