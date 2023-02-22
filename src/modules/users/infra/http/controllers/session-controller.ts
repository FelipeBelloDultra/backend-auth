// Packages
import { container } from "tsyringe";

// Interfaces
import { IRequest, IResponse } from "@/shared/interfaces/http";

// Controllers
import { BaseController } from "@/shared/infra/http/controllers/base-controller";

// Use Cases
import { AuthenticateUser } from "@/modules/users/use-cases/authenticate-user";
import { ShowAuthenticatedUser } from "@/modules/users/use-cases/show-authenticated-user";

export class SessionController {
  public async create(req: IRequest, res: IResponse): Promise<IResponse> {
    const { email, password } = req.body;

    const authenticateUser = container.resolve(AuthenticateUser);

    const result = await authenticateUser.execute({
      email,
      password,
    });

    if (result.isLeft()) {
      return BaseController.responseWithError(res, {
        errors: result.value.errors,
        message: result.value.message,
        statusCode: result.value.statusCode,
      });
    }

    return BaseController.responseWithJSON(res, {
      data: {
        token: result.value,
      },
      statusCode: 200,
    });
  }

  public async index(req: IRequest, res: IResponse): Promise<IResponse> {
    const { id_user, name, email, username } = req.user;

    const showAuthenticatedUser = container.resolve(ShowAuthenticatedUser);

    const result = await showAuthenticatedUser.execute({
      id_user,
      name,
      email,
      username,
    });

    if (result.isLeft()) {
      return BaseController.responseWithError(res, {
        errors: result.value.errors,
        message: result.value.message,
        statusCode: result.value.statusCode,
      });
    }

    return BaseController.responseWithJSON(res, {
      data: result.value,
      statusCode: 200,
    });
  }
}
