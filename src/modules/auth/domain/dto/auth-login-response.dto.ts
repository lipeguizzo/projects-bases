import { UserRequest } from '../../../../shared/types/user-request';

export class AuthLoginResponseDto {
  user: UserRequest;
  token: string;
  refreshToken: string;
}
