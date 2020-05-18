const extractMessage = (messageOrError: string | Error): string => {
  if (typeof messageOrError !== 'string' && 'message' in messageOrError) {
    return messageOrError.message;
  }

  return messageOrError;
};

export abstract class AppError extends Error {
  public abstract readonly code: string;

  constructor(message: string | Error) {
    super(extractMessage(message));
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
  }
}

export class ConfigError extends AppError {
  public readonly code = 'CONFIG_ERROR';
}

