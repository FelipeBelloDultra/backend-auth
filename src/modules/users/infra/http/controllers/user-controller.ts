// Interfaces
import { IRequest, IResponse } from "@/shared/interfaces/http";

// Use Cases
import { CreateUser } from "@/modules/users/use-cases/create-user";

// Repositories
import { UserRepository } from "../../../infra/database/repositories/user-repository";

const userRepository = new UserRepository();

export class UserController {
  public async create(req: IRequest, res: IResponse): Promise<IResponse> {
    const { name, email, password } = req.body;

    const createUser = new CreateUser(userRepository);

    const result = await createUser.execute({
      name,
      email,
      password,
    });

    if (result.isLeft()) {
      return res.status(422).json({ error: result.value.message });
    }

    return res.status(201).send();
  }
}
