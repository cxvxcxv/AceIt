import { TQuestionInput } from '@/types/question.types';

import { createEmptyOption } from '@/utils/question/createEmptyOption';

export const updateQuestionOptions = (
  questions: TQuestionInput[],
  questionId: string,
): TQuestionInput[] => {
  return questions.map(question => {
    if (question.id === questionId) {
      if ((question.options?.length || 0) >= 4) return question;

      return {
        ...question,
        options: [...(question.options || []), createEmptyOption()],
      };
    }
    return question;
  });
};
