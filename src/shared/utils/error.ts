import { Response } from 'express';
import { IError } from './../domain/interfaces/error.interface';
import { ZodError } from 'zod';

export function generateJsonError(errorException: unknown, response: Response) {
  const error = errorException as IError;
  return response.status(error.status || 500).json({
    status: error.status || 500,
    name: error.name,
    message: error.message,
  });
}

export function generateZodError(errorException: unknown, response: Response) {
  const error = errorException as ZodError;
  const formattedErrors = error.errors.map((field) => field.message);
  return response.status(400).json({
    status: 400,
    name: error.name,
    message: formattedErrors,
  });
}
