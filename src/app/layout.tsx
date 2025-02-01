import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import type { Metadata } from 'next';
import { ReduxProvider } from '@/providers/ReduxProvider';
import "./globals.css";

export const metadata: Metadata = {
  title: 'LEPEVA LMS',
  description: 'Language Learning Management System',
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} data-theme="light">
      <body className="min-h-screen bg-base-100 font-sans antialiased">
        <ReduxProvider>
          <main className="flex min-h-screen flex-col">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
