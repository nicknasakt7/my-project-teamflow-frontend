import { ApiError } from '../api/api.error';
import { ErrorActionResult } from './action.types';

export const formatActionError = (error: unknown): ErrorActionResult => {
  if (error instanceof ApiError) {
    return {
      success: false,
      code: error.code,
      message: error.message,
    };
  }
  return {
    success: false,
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR',
  };
};
