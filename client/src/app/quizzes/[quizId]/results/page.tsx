import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Results } from './Results';

export const metadata: Metadata = {
  title: 'Results',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return (
    <section className="flex min-h-screen w-full animate-gradient-move items-center justify-center overflow-x-hidden bg-primary-gradient bg-4x p-4 text-white focus-within:overflow-x-hidden">
      <Results />
    </section>
  );
}
