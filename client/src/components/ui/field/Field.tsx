import clsx from 'clsx';
import { InputHTMLAttributes, forwardRef } from 'react';

type TInputFieldProps = {
  id: string;
  label?: string;
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
      placeholder,
      disabled,
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={className}>
        <label htmlFor={id} className="block"></label>
        <input
          ref={ref}
          id={id}
          type={type}
          disabled={disabled}
          autoComplete={autoComplete}
          className={clsx(`${inputClassname}`, { '': disabled })} //*continue
          {...rest}
        />
      </div>
    );
  },
);
