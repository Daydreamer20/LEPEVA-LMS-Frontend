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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
