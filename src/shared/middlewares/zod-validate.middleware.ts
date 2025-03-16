import { NextFunction, Response } from 'express';
import { AnyZodObject } from 'zod';
import { IRequest } from '../domain/interfaces/request.interface';
import { generateZodError } from '../utils/error';

export const zodValidateMiddleware =
  (schema: AnyZodObject) =>
  async (
    request: IRequest,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await schema.parseAsync({
        body: request.body,
        query: request.query,
        params: request.params,
        file: request.file,
      });
      next();
    } catch (error) {
      generateZodError(error, response);
    }
  };
