'use client';

import clsx from 'clsx';
import { Check } from 'lucide-react';
import { InputHTMLAttributes } from 'react';

type TCheckboxProps = {
  label: string;
  shape: 'square' | 'circle';
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = ({
  id,
  className,
  shape,
  label,
  checked,
  onChange,
}: TCheckboxProps) => {
  return (
    <label className="flex cursor-pointer items-center space-x-2">
      <input
        type="checkbox"
        id={id}
        className="peer hidden"
        checked={checked}
        onChange={onChange}
      />
      <div
        className={clsx(
          'flex h-7 w-7 items-center justify-center border border-white border-opacity-100 text-white text-opacity-0 transition-all peer-checked:text-opacity-100',
          {
            'rounded-full': shape === 'circle',
            'rounded-md': shape === 'square',
          },
        )}
      >
        <Check className="h-5 w-5" />
      </div>
      <span className="text-white">{label}</span>
    </label>
  );
};

export default Checkbox;
