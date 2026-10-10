import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gestor de Compras',
  description: 'Painel de Controle de Compras e Despensa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="h-full bg-slate-50">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="h-full flex flex-col text-slate-800 antialiased font-sans select-none pb-20">
        {children}
      </body>
    </html>
  );
}