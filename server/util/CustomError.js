export class CustomError extends Error {
  constructor(code = 500, customMessage, ...args) {
    super(args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    if (code === 500) {
      this.cause = this.message;
      this.message = 'Internal Server Error';
    }
    this.message = customMessage;
    this.code = code;
    this.date = new Date();
  }
}

export const handleException = (res, error) => {
  if (error instanceof CustomError) {
    return res.status(error.code).json({error: error.message});
  }
  return res.status(500).json({error: 'Internal Server Error.'});
};
