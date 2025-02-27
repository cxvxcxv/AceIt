import { SERVER_ENDPOINTS } from '@/constants/server-endpoint.constants';

import { IQuiz, TQuizInput } from '@/types/quiz.types';

import { axiosAuth } from '@/api/interceptors';

export const QuizService = {
  async getAll() {
    try {
      const response = await axiosAuth.get(`${SERVER_ENDPOINTS.QUIZZES.BASE}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getOne(quizId: string) {
    try {
      const response = await axiosAuth.get(
        `${SERVER_ENDPOINTS.QUIZZES.BASE}/${quizId}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async create(data: TQuizInput) {
    try {
      const response = await axiosAuth.post<IQuiz>(
        `${SERVER_ENDPOINTS.QUIZZES.NEW}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async update(quizId: string, data: Partial<TQuizInput>) {
    try {
      const response = await axiosAuth.patch<IQuiz>(
        `${SERVER_ENDPOINTS.QUIZZES.BASE}/${quizId}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(quizId: string) {
    try {
      const response = await axiosAuth.delete<IQuiz>(
        `${SERVER_ENDPOINTS.QUIZZES.BASE}/${quizId}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
