'use client';

import clsx from 'clsx';
import { Check, Dot } from 'lucide-react';
import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type TCheckboxProps = {
  label: string;
  shape: 'square' | 'circle';
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({
  id,
  shape,
  label,
  className,
  onChange,
  ...rest
}: TCheckboxProps) => {
  return (
    <label className="flex cursor-pointer items-center space-x-2">
      <input
        type="checkbox"
        id={id}
        className="peer sr-only"
        onChange={onChange}
        {...rest}
      />
      <div
        className={twMerge(
          clsx(
            'flex aspect-square min-h-7 min-w-7 items-center justify-center border border-white border-opacity-100 text-center text-white ring-white transition-all peer-checked:text-opacity-100 peer-focus:ring-1 peer-[&:not(:checked)]:text-opacity-0',
            {
              'rounded-full': shape === 'circle',
              'rounded-md': shape === 'square',
            },
            className,
          ),
        )}
      >
        {shape === 'circle' ? (
          <Dot
            className="aspect-square h-5 w-5 scale-150 leading-none"
            strokeWidth={4}
          />
        ) : (
          <Check className="h-5 w-5" />
        )}
      </div>
      <span className="text-white">{label}</span>
    </label>
  );
};

export default Checkbox;
