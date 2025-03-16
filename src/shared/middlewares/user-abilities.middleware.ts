import { $Enums } from '@prisma/client';
import { NextFunction, Response } from 'express';
import { IRequest } from '../domain/interfaces/request.interface';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { UserRequest } from '../types/user-request';
import { prisma } from '../../infra/database/prisma.service';
import { generateJsonError } from '../utils/error';

export const userAbilitiesMiddleware =
  (code: $Enums.AbilityCodes, action: $Enums.AbilityActions) =>
  async (
    request: IRequest,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const user: UserRequest = request.user;
      if (!user) throw new UnauthorizedException('Usuário não encontrado!');

      const hasAbility = await prisma.roleAbility.findFirst({
        where: {
          roleId: user.roleId,
          ability: {
            code: code,
            action: action,
          },
        },
      });

      if (!hasAbility) {
        throw new UnauthorizedException('Usuário sem habilidades necessárias!');
      }

      next();
    } catch (error) {
      generateJsonError(error, response);
    }
  };
