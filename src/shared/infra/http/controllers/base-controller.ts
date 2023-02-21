// Interfaces
import { INextFunction, IResponse } from "@/shared/interfaces/http";
import { IHttpError } from "@/shared/interfaces/errors";

interface IResponseWithJSON<T> {
  statusCode?: number;
  data: T;
}

export abstract class BaseController {
  static async responseCreated(res: IResponse): Promise<IResponse> {
    return res.status(201).send();
  }

  static async responseWithJSON<T>(
    res: IResponse,
    { statusCode = 200, data }: IResponseWithJSON<T>
  ): Promise<IResponse> {
    return res.status(statusCode).json({
      data,
      error: null,
    });
  }

  static async responseWithError(
    res: IResponse,
    { statusCode = 400, errors = {}, message }: IHttpError
  ): Promise<IResponse> {
    return res.status(statusCode).json({
      data: null,
      error: {
        errors,
        message,
        statusCode,
      },
    });
  }

  static async responseNext(next: INextFunction): Promise<void> {
    return next();
  }
}
