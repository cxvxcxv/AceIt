import type { Metadata } from 'next';

import { Home } from './Home';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'This is where everything begins. Try preparing for your exams right now!',
};

export default function Page() {
  return <Home />;
}
