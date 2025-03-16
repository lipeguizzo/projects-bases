import { Response } from 'express';
import { IRequest } from '../../../shared/domain/interfaces/request.interface';
import { AuthLoginDto } from '../domain/dto/auth-login.dto';
import { authLoginService } from '../services/auth-login.service';
import { AuthRecoverPasswordDto } from '../domain/dto/auth-recover-password.dto';
import { authRecoverPasswordService } from '../services/auth-recover-password.service';
import { AuthResetPasswordDto } from '../domain/dto/auth-reset-password.dto';
import { authResetPasswordService } from '../services/auth-reset-password.service';
import { AuthRefreshDto } from '../domain/dto/auth-refresh.dto';
import { authRefreshService } from '../services/auth-refresh.service';
import { AuthRegisterDto } from '../domain/dto/auth-register.dto';
import { authRegisterService } from '../services/auth-register.service';
import { generateJsonError } from '../../../shared/utils/error';

class AuthController {
  async login(request: IRequest, response: Response) {
    const dto: AuthLoginDto = request.body;
    try {
      response.status(200).json(await authLoginService.execute(dto));
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async refresh(request: IRequest, response: Response) {
    const dto: AuthRefreshDto = request.body;
    try {
      response
        .status(200)
        .json(await authRefreshService.execute(dto.refreshToken));
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async register(request: IRequest, response: Response) {
    const dto: AuthRegisterDto = request.body;
    try {
      response.status(201).json(await authRegisterService.execute(dto));
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async recoverPassword(request: IRequest, response: Response) {
    const dto: AuthRecoverPasswordDto = request.body;
    try {
      response.status(200).json(await authRecoverPasswordService.execute(dto));
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async resetPassword(request: IRequest, response: Response) {
    const dto: AuthResetPasswordDto = request.body;
    try {
      response.status(200).json(await authResetPasswordService.execute(dto));
    } catch (error) {
      generateJsonError(error, response);
    }
  }
}

export const authController = new AuthController();
