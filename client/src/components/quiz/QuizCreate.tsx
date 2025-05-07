import { Plus } from 'lucide-react';

import { ButtonActive } from '../ui/button/ButtonActive';

export const QuizCreate = () => {
  return (
    <ButtonActive className="flex items-center justify-center gap-2 rounded-md px-2 py-2">
      <Plus />
      Create
    </ButtonActive>
  );
};
