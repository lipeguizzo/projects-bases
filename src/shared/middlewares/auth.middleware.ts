import { NextFunction, Response } from 'express';
import { IRequest } from '../domain/interfaces/request.interface';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { tokenVerifyService } from '../services/token-verify.service';
import { UserRequest } from '../types/user-request';
import { generateJsonError } from '../utils/error';

export const authMiddleware = async (
  request: IRequest,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (
      request.path.startsWith('/auth') ||
      request.path.startsWith('/files') ||
      request.path.startsWith('/doc')
    ) {
      return next();
    }

    const token: string | undefined = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException('Token Inválido!');
    }

    const user: UserRequest = await tokenVerifyService.execute(token);
    if (!user) {
      throw new UnauthorizedException('Usuário inválido!');
    }

    request.user = user;

    next();
  } catch (error) {
    generateJsonError(error, response);
  }
};
