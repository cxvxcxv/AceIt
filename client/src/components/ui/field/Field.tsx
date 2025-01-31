'use client';

import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

type TInputFieldProps = {
  id: string;
  label: string;
  className?: string;
  inputClassname?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Field = forwardRef<HTMLInputElement, TInputFieldProps>(
  (
    {
      id,
      label,
      autoComplete,
      className,
      inputClassname,
      type,
      disabled,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={clsx('relative', className)}>
        <input
          ref={ref}
          id={id}
          type={type}
          disabled={disabled}
          placeholder=" "
          autoComplete={autoComplete || 'off'}
          className={clsx(
            'border-gray-300 peer w-full border border-opacity-30 px-5 pb-3 pt-6 text-primary outline-none focus:border-l-4 focus:border-l-primary',
            inputClassname,
            { 'cursor-not-allowed opacity-50': disabled },
          )}
          {...rest}
        />
        <label
          htmlFor={id}
          className={clsx(
            'text-gray-500 absolute left-6 top-2 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm',
            { 'opacity-50': disabled },
          )}
        >
          {label}
        </label>
      </div>
    );
  },
);
