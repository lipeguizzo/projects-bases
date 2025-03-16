import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '../exceptions/unauthorized.exception';
import { UserRequest } from '../types/user-request';

class TokenVerifyService {
  async execute(token: string, secret?: string): Promise<UserRequest> {
    try {
      const payload: UserRequest = jwt.verify(
        token,
        secret ?? String(process.env.JWT_SECRET),
      ) as UserRequest;
      return payload;
    } catch {
      throw new UnauthorizedException('Token inválido!');
    }
  }
}

export const tokenVerifyService = new TokenVerifyService();
