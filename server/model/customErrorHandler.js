import { CustomError } from '../util/CustomError';

const getUniqueFieldName = (message) => {
  const field = message.match(/[a-zA-Z]+_1/gi)[0];
  return field.replace('_1', '').trim();
};

const customErrorHandler = (error, doc, next) => {
  const UNIQUE_ERROR_CODE = 11000;

  if (error.code === UNIQUE_ERROR_CODE) {
      return next(new CustomError(400, `${getUniqueFieldName(error.message)} has already been used.`));
    }

  const errorBodyArr = error.message.split(':');
  return next(new CustomError(400, `${errorBodyArr[errorBodyArr.length - 1].trim()}`));
};

export default customErrorHandler;
