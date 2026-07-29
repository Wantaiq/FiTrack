class ApiError extends Error {
  status?: number;
  error?: string;
  details?: unknown;

  constructor(
    message: string,
    options?: {
      status?: number;
      error?: string;
      details?: unknown;
    },
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = options?.status;
    this.error = options?.error;
    this.details = options?.details;
  }
}

export default ApiError;
