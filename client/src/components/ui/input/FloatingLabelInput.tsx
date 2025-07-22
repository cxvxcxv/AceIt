'use client';

import clsx from 'clsx';
import { InputHTMLAttributes, Ref } from 'react';

type TFloatingLabelInputProps = {
  id: string;
  label: string;
  className?: string;
  inputClassname?: string;
  ref?: Ref<HTMLInputElement>; //necessary for libraries like react hook form to access the input
} & InputHTMLAttributes<HTMLInputElement>;

export const FloatingLabelInput = ({
  id,
  label,
  autoComplete,
  className,
  inputClassname,
  disabled,
  ref,
  ...rest
}: TFloatingLabelInputProps) => {
  return (
    <div className={clsx('relative', className)}>
      <input
        ref={ref}
        id={id}
        placeholder=" "
        autoComplete={autoComplete || 'off'}
        className={clsx(
          'peer w-full border border-gray-300 px-5 pb-3 pt-6 text-primary outline-none focus:border-l-4 focus:border-l-primary',
          inputClassname,
          { 'cursor-not-allowed opacity-50': disabled },
        )}
        {...rest}
      />
      <label
        htmlFor={id}
        className={clsx(
          'absolute left-6 top-2 text-sm text-gray-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm',
          { 'opacity-50': disabled },
        )}
      >
        {label}
      </label>
    </div>
  );
};
