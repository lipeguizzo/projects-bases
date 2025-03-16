import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRequest } from '../types/user-request';

@Injectable()
export class TokenVerifyService {
  constructor(private jwtService: JwtService) {}
  async execute(token: string, secret?: string): Promise<UserRequest> {
    try {
      const payload: UserRequest = await this.jwtService.verifyAsync(token, {
        secret: secret ?? process.env.JWT_SECRET,
      });
      return payload;
    } catch {
      throw new UnauthorizedException('Token inválido!');
    }
  }
}
