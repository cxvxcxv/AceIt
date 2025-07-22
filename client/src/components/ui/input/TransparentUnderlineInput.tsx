'use client';

import clsx from 'clsx';
import { InputHTMLAttributes, Ref } from 'react';

type TTransparentUnderlineInputProps = {
  ref?: Ref<HTMLInputElement>;
} & InputHTMLAttributes<HTMLInputElement>;

export const TransparentUnderlineInput = ({
  className,
  disabled,
  autoComplete,
  ref,
  ...rest
}: TTransparentUnderlineInputProps) => {
  return (
    <input
      ref={ref}
      autoComplete={autoComplete || 'off'}
      className={clsx(
        'w-full rounded-sm border-b-2 border-transparent p-2 outline-none transition-colors duration-500 focus:border-primary',
        { 'cursor-not-allowed opacity-70': disabled },
        className,
      )}
      {...rest}
    />
  );
};
