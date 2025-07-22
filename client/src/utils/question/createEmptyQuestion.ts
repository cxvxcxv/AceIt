import { TQuestionInput } from '@/types/question.types';

import { createEmptyOption } from './createEmptyOption';

export const createEmptyQuestion = (): TQuestionInput => ({
  id: Date.now().toString(),
  content: '',
  options: [createEmptyOption(), createEmptyOption()],
});
