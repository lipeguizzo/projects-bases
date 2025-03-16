import jwt from 'jsonwebtoken';
import { UserRequest } from '../types/user-request';

class TokenSignService {
  async execute(
    user: UserRequest,
    expires: string,
    secret?: string,
  ): Promise<string> {
    const token: string = jwt.sign(
      user!,
      secret ?? String(process.env.JWT_SECRET),
      {
        expiresIn: expires,
      },
    );

    return token;
  }
}

export const tokenSignService = new TokenSignService();
