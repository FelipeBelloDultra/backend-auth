// Packages
import { container } from "tsyringe";

// Interfaces
import { IRequest, IResponse } from "@/shared/interfaces/http";

// Controllers
import { BaseController } from "@/shared/infra/http/controllers/base-controller";

// Use Cases
import { CreateUser } from "@/modules/users/use-cases/create-user";
import { UpdateUser } from "@/modules/users/use-cases/update-user";

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
    const { name, email: newEmail, password, username } = req.body;
    const { id_user, email } = req.user;

    const updatedUser = container.resolve(UpdateUser);

    const result = await updatedUser.execute(
      { id_user, email },
      {
        name,
        email: newEmail,
        username,
        password,
      }
    );

    if (result.isLeft()) {
      return BaseController.responseWithError(res, {
        errors: result.value.errors,
        message: result.value.message,
        statusCode: result.value.statusCode,
      });
    }

    return BaseController.responseWithJSON(res, { data: result.value });
  }
}
