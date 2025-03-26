import type { Metadata } from 'next';
import { ReactNode } from 'react';
import '../app/globals.css';

export const metadata: Metadata = {
  title: 'Projeto Base',
  description: 'Projeto Base feito em Nest.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth focus:scroll-auto">
      <body className="w-full h-full">{children}</body>
    </html>
  );
}
