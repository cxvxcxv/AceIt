import type { Metadata } from 'next';

import { NO_INDEX_PAGE } from '@/constants/seo.constants';

import { QuizSettings } from './Settings';

export const metadata: Metadata = {
  title: 'Quiz Settings',
  ...NO_INDEX_PAGE,
};

export default function QuizSettingsPage() {
  return (
    <section className="flex-w flex flex-col items-center p-2">
      <QuizSettings />
    </section>
  );
}
