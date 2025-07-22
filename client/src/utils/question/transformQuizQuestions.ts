import { IQuestion, TQuestionInput } from '@/types/question.types';

export const transformQuizQuestions = (
  questions: IQuestion[],
): TQuestionInput[] => {
  return questions.map(question => ({
    id: question.id,
    content: question.content,
    correctAnswer: question.correctAnswer,
    options:
      question.options?.map(option => ({
        id: option.id,
        optionText: option.optionText,
        isCorrect: option.isCorrect,
      })) || [],
  }));
};
