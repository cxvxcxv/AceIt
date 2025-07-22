import { TQuestionInput } from '@/types/question.types';

export const removeOptionFromQuestion = (
  questions: TQuestionInput[],
  questionId: string,
  optionId: string,
): TQuestionInput[] => {
  return questions.map(question => {
    if (question.id === questionId) {
      return {
        ...question,
        options: question.options.filter(option => option.id !== optionId),
      };
    }
    return question;
  });
};
