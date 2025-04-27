import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Quiz } from './Quiz';

export const metadata: Metadata = {
  title: 'quiz',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return (
    <section className="relative flex min-h-screen w-full animate-gradient-move items-center justify-center overflow-hidden bg-primary-gradient bg-4x p-8 focus-within:overflow-x-hidden">
      <Quiz />;
    </section>
  );
}
