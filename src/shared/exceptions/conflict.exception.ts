export class ConflictException extends Error {
  status: number;
  message: string;

  constructor(message: string) {
    super(message);
    this.status = 409;
    this.message = message;
    this.name = 'Conflict';
  }
}
