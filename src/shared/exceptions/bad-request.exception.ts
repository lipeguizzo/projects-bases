export class BadRequestException extends Error {
  status: number;
  message: string;

  constructor(message: string) {
    super(message);
    this.status = 400;
    this.message = message;
    this.name = 'Bad Request';
  }
}
