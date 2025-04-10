import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Quiz } from './Quiz';

export const metadata: Metadata = {
  title: 'quiz',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return <Quiz />;
}
