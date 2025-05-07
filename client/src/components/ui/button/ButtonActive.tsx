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
        'border border-primary bg-primary text-white',
        !disabled && 'shadow-sm shadow-primary ...',
        disabled && 'cursor-not-allowed ...',
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
