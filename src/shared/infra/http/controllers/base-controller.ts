// Interfaces
import { IResponse } from "@/shared/interfaces/http";

export class BaseController {
  public async responseWithJSON<T>(
    res: IResponse,
    data: T
  ): Promise<IResponse> {
    return res.status(200).json({
      error: null,
      data,
    });
  }

  public async responseWithError<T>(
    res: IResponse,
    statusCode = 500,
    error: T
  ): Promise<IResponse> {
    return res.status(statusCode).json({
      error,
      data: null,
    });
  }

  public async responseCreated(res: IResponse): Promise<IResponse> {
    return res.status(201).send();
  }
}
