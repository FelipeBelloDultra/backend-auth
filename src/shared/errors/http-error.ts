// Interfaces
import { IErrorsStack, IHttpError } from "../interfaces/errors";

export abstract class HttpError {
  public message: string;
  public statusCode: number;
  public errors: IErrorsStack;

  constructor({ message, statusCode = 500, errors }: IHttpError) {
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
