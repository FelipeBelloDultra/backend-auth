// Packages
import { container } from "tsyringe";

// Interfaces
import { IRequest, IResponse } from "@/shared/interfaces/http";

// Base Controller
import { BaseController } from "@/shared/infra/http/controllers/base-controller";

// Use Cases
import { CreateUser } from "@/modules/users/use-cases/create-user";

export class UserController extends BaseController {
  constructor() {
    super();
  }

  public async create(req: IRequest, res: IResponse): Promise<IResponse> {
    const { name, email, password } = req.body;

    const createUser = container.resolve(CreateUser);

    const result = await createUser.execute({
      name,
      email,
      password,
    });

    if (result.isLeft()) {
      return this.responseWithError(res, 422, result.value);
    }

    return this.responseCreated(res);
  }
}
