// Packages
import { verify } from "jsonwebtoken";

// Config
import authConfig from "@/config/auth";

// Controllers
import { BaseController } from "../controllers/base-controller";

// Interfaces
import { IRequest, IResponse, INextFunction } from "@/shared/interfaces/http";

// Errors
import { InvalidToken } from "@/shared/errors/invalid-token";
import { MissingToken } from "@/shared/errors/missing-token";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  name: string;
  email: string;
  username: string | null;
}

export class EnsureAuthenticated {
  public verify(req: IRequest, res: IResponse, next: INextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return BaseController.responseWithError(res, new MissingToken());
    }

    const [, token] = authHeader.split(" ");

    try {
      const decoded = verify(token, authConfig.secret);

      const { sub, name, email, username } = decoded as ITokenPayload;

      req.user = {
        id_user: sub,
        name,
        email,
        username,
      };

      BaseController.responseNext(next);
    } catch {
      return BaseController.responseWithError(res, new InvalidToken());
    }
  }
}
