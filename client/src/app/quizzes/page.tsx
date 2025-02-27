import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Quizzes } from './Quizzes';

export const metadata: Metadata = {
  title: 'Quizzes',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return <Quizzes />;
}
