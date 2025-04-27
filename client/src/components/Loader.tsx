import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';

export const Loader = ({ classname }: { classname: string }) => {
  return <LoaderCircle className={clsx('animate-spin', classname)} />;
};
