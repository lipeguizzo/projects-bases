export class UnauthorizedException extends Error {
  status: number;
  message: string;

  constructor(message: string) {
    super(message);
    this.status = 401;
    this.message = message;
    this.name = 'Unauthorized';
  }
}
