import { IQuestion } from './question.types';

export interface IQuiz {
  id: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  title: string;
  userId: string;
  questions: IQuestion[];
  _count: {
    questions: number;
  };
}

export type TQuizInput = {
  title: string;
  isPublic: boolean;
};

export type TQuizSortType = 'title' | 'newest' | 'oldest';
