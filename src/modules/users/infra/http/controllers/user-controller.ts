// Packages
import { container } from "tsyringe";

// Interfaces
import { IRequest, IResponse } from "@/shared/interfaces/http";

// Controllers
import { BaseController } from "@/shared/infra/http/controllers/base-controller";

// Use Cases
import { CreateUser } from "@/modules/users/use-cases/create-user";

export class UserController {
  public async create(req: IRequest, res: IResponse): Promise<IResponse> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUser);

    const result = await createUser.execute({
      name,
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

    return BaseController.responseCreated(res);
  }

  public async update(req: IRequest, res: IResponse): Promise<IResponse> {
    const { name, email, password, username } = req.body;
    const { id_user } = req.user;

    return BaseController.responseWithJSON(res, {
      data: {
        id_user,
        name,
        email,
        password,
        username,
      },
    });
  }
}
