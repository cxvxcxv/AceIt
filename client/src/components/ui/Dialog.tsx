'use client';

import clsx from 'clsx';
import { X } from 'lucide-react';
import { DialogHTMLAttributes, useEffect, useRef } from 'react';

type TDialogProps = {
  isOpen: boolean;
  onClose: () => void;
} & DialogHTMLAttributes<HTMLDialogElement>;

export const Dialog = ({
  isOpen,
  onClose,
  children,
  className,
}: TDialogProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    else if (!isOpen && dialog.open) dialog.close();
  }, [isOpen, onClose]);

  return (
    <dialog
      ref={dialogRef}
      onClick={e => e.currentTarget === e.target && onClose()} //closes the dialog on click on the dialog
      onClose={onClose} //reacts on dialog's native behavior and updates the state
      className="rounded-3xl"
    >
      <div
        onClick={e => e.stopPropagation()} //prevents closing the dialong when clicking inside itself
        className={clsx('relative p-8', className)}
      >
        <button className="absolute right-2 top-2" onClick={onClose}>
          <X
            strokeWidth={1.75}
            className="text-gray-500 transition hover:scale-105 hover:text-primary active:scale-90"
          />
        </button>
        {children}
      </div>
    </dialog>
  );
};
