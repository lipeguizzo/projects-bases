import { UserRequest } from '../../../../shared/types/user-request';

export class AuthRefreshResponseDto {
  user: UserRequest;
  token: string;
  refreshToken: string;
}
