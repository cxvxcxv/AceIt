'use client';

import clsx from 'clsx';
import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export const ButtonActive = ({
  children,
  className,
  disabled,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  return (
    <button
      className={clsx(
        'border border-primary bg-primary px-6 py-3 text-bg-white',
        className,
        {
          'shadow-md shadow-primary transition-colors hover:bg-bg-white hover:text-primary':
            !disabled,
        },
        {
          'cursor-not-allowed opacity-50': disabled,
        },
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
