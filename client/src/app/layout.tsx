import clsx from 'clsx';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import { SITE_NAME } from '@/constants/seo.constants';

import { Providers } from './Providers';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Pass your exams on 100%',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(poppins.className, 'text-secondary')}>
        <Providers>
          {children}
          <Toaster position="top-center" toastOptions={{ duration: 1500 }} />
        </Providers>
      </body>
    </html>
  );
}
