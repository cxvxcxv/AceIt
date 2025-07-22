export interface IQuestion {
  id: string;
  content: string;
  correctAnswer?: string;
  options?: IQuestionOption[];
  quizId: string;
}

export interface IQuestionOption {
  id: string;
  optionText: string;
  isCorrect: boolean;
}

export type TQuestionOptionInput = {
  id: string;
  optionText: string;
  isCorrect: boolean;
};

export type TQuestionInput = {
  id: string;
  content: string;
  correctAnswer?: string;
  options: TQuestionOptionInput[];
};
