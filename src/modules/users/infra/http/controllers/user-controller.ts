// Interfaces
import { IRequest, IResponse } from "@/shared/interfaces/http";

export class UserController {
  public async create(req: IRequest, res: IResponse): Promise<IResponse> {
    return res.status(200).json({ ok: true });
  }
}
