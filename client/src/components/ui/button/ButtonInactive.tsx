'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export const ButtonInactive = ({
  children,
  className,
  disabled,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      className={clsx(
        'border border-primary px-6 py-3 text-primary transition-colors',
        className,
        {
          'shadow-md shadow-primary hover:bg-primary hover:text-bg-white':
            !disabled,
        },
        {
          'cursor-not-allowed opacity-50': disabled,
        },
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
