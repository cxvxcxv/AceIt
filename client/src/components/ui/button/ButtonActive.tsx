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
        `bg-primary text-bg-white shadow-primary border-primary hover:bg-bg-white hover:text-primary border px-6 py-3 shadow-md transition-colors ${className}`,
        {
          '': disabled,
        },
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
