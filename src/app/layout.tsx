import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BoltInsight - Proposal Management System',
  description: 'AI-powered research proposal management and creation platform',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
