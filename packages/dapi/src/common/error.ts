export type CustomErrorOptions = ErrorOptions & { name?: string } & Record<string, unknown>;

export class CustomError extends Error {
  constructor(message: string, options: CustomErrorOptions = {}) {
    super(message, { cause: options.cause });

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = options.name || 'CustomError';
  }
}
