'use client';

import clsx from 'clsx';
import { PropsWithChildren } from 'react';

export const TransparentGlass = ({
  children,
  className,
}: PropsWithChildren & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        'rounded-2xl border border-white/20 bg-white/10 p-6 text-white shadow-lg backdrop-blur-lg',
        className,
      )}
    >
      {children}
    </div>
  );
};
