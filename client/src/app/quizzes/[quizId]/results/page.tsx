import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { Results } from './Results';

export const metadata: Metadata = {
  title: 'Results',
  ...NO_INDEX_PAGE,
};

export default function Page() {
  return <Results />;
}
