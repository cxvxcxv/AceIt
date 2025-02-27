import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

export const metadata: Metadata = {
  title: 'Redirecting...',
  ...NO_INDEX_PAGE,
};

export default function HomePage() {
  redirect('/quizzes');
}
