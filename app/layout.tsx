import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AssessmentProvider } from '@/lib/assessment-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'SDG Impact Assessment',
  description: 'SDG Impact Assessment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AssessmentProvider>{children}</AssessmentProvider>
      </body>
    </html>
  );
}