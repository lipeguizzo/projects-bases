import { UserRequest } from 'src/shared/types/user-request';

export class AuthLoginResponseDto {
  user: UserRequest;
  token: string;
  refreshToken: string;
}
