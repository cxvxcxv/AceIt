export const SERVER_ENDPOINTS = {
  AUTH: {
    BASE: 'auth',
    REGISTER: 'auth/register',
    LOGIN: {
      BASE: 'auth/login',
      REFRESH_TOKENS: 'auth/login/refresh-tokens',
    },
    LOGOUT: {
      BASE: 'auth/logout',
    },
  },
  QUIZZES: {
    BASE: 'quizzes',
    NEW: 'quizzes/new',
  },
  PROFILE: {
    BASE: '/profile',
  },
};
