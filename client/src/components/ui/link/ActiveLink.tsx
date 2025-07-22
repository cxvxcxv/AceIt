'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { AnchorHTMLAttributes, PropsWithChildren } from 'react';

export const ActiveLink = ({
  children,
  className,
  href,
  ...rest
}: PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
>) => {
  return (
    <Link
      href={href}
      passHref
      className={clsx(
        'block border border-primary bg-primary px-6 py-3 text-center text-white shadow-sm shadow-primary transition-colors hover:bg-white hover:text-primary',
        className,
      )}
      {...rest}
    >
      {children}
    </Link>
  );
};
