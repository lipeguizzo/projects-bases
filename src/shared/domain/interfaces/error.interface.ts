export interface IError extends Error {
  status: number;
  name: string;
  message: string;
}
