'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export const InactiveButton = ({
  children,
  className,
  disabled,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      className={clsx(
        'border border-primary text-primary transition-colors',
        className,
        {
          'shadow-md shadow-primary hover:bg-primary hover:text-white':
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
