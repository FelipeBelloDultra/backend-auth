// Packages
import { container } from "tsyringe";

// Interfaces
import { IRequest, IResponse } from "@/shared/interfaces/http";

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
      return res.status(result.value.statusCode).json({
        error: result.value,
        data: null,
      });
    }

    return res.status(201).send();
  }
}
