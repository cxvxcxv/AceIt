export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'object' && error !== null) {
    const errWithResponse = error as {
      response?: { data?: { message?: string | string[] } };
    };
    const message = errWithResponse.response?.data?.message;

    if (message) {
      return Array.isArray(message) ? message[0] : message;
    }

    const errWithMessage = error as { message?: string };
    if (errWithMessage.message) {
      return errWithMessage.message;
    }
  }

  return 'An unknown error occurred';
};
