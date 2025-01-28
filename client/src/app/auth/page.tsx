import type { Metadata } from 'next';

import { Auth } from './Auth';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Login | Register',
};

export default function Page() {
  return <Auth />;
}
