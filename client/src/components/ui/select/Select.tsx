'use client';

import clsx from 'clsx';
import { LucideIcon } from 'lucide-react';
import { SelectHTMLAttributes } from 'react';

type TSelectProps = {
  icon: LucideIcon;
  id: string;
  wrapperClassname?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({
  icon: Icon,
  children,
  id,
  className,
  wrapperClassname,
  ...rest
}: TSelectProps) => {
  return (
    <div className={clsx('group relative', wrapperClassname)}>
      <Icon
        strokeWidth={1.75}
        className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 leading-none transition-colors group-focus-within:text-primary"
      />
      <select
        id={id}
        className={clsx(
          'w-full rounded-lg border border-gray-300 p-2 pl-10 outline-none focus:border-primary disabled:cursor-not-allowed disabled:bg-gray-100',
          className,
        )}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
};
