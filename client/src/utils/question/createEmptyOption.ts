import { TQuestionOptionInput } from '@/types/question.types';

export const createEmptyOption = (): TQuestionOptionInput => ({
  id: Date.now().toString(),
  optionText: '',
  isCorrect: false,
});
