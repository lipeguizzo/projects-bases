import { Request } from 'express';
import { UserRequest } from './../../types/user-request';

export interface IRequest extends Request {
  user?: UserRequest;
}
