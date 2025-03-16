import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRequest } from '../types/user-request';

@Injectable()
export class TokenSignService {
  constructor(private jwtService: JwtService) {}
  async execute(
    user: UserRequest,
    expires: string,
    secret?: string,
  ): Promise<string> {
    const token: string = await this.jwtService.signAsync(user, {
      expiresIn: expires,
      secret: secret ?? process.env.JWT_SECRET,
    });

    return token;
  }
}
