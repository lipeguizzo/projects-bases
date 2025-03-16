export class NotFoundException extends Error {
  status: number;
  message: string;

  constructor(message: string) {
    super(message);
    this.status = 404;
    this.message = message;
    this.name = 'Not Found';
  }
}
