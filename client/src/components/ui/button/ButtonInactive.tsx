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
        `border-primary shadow-primary text-primary hover:bg-primary hover:text-bg-white border px-6 py-3 shadow-md transition-colors ${className}`,
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
