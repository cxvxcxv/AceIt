import { SERVER_ENDPOINTS } from '@/constants/server-endpoint.constants';

import { IQuestion, TQuestionInput } from '@/types/question.types';

import { axiosAuth } from '@/api/interceptors';

export const QuestionService = {
  async get(quizId: string, questionId: string) {
    try {
      const response = await axiosAuth.get<IQuestion>(
        `${SERVER_ENDPOINTS.QUIZZES.BASE}/${quizId}/${questionId}`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async create(quizId: string, data: TQuestionInput) {
    try {
      const response = await axiosAuth.post<IQuestion>(
        `${SERVER_ENDPOINTS.QUIZZES.BASE}/${quizId}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async update(quizId: string, questionId: string, data: TQuestionInput) {
    try {
      const response = await axiosAuth.put<IQuestion>(
        `${SERVER_ENDPOINTS.QUIZZES.BASE}/${quizId}/${questionId}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async delete(quizId: string, questionId: string) {
    try {
      const response = await axiosAuth.delete<IQuestion>(
        `${SERVER_ENDPOINTS.QUIZZES.BASE}/${quizId}/${questionId}`,
      );
    } catch (error) {
      throw error;
    }
  },
};
