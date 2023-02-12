// Interfaces
import { IRequest, IResponse } from "@/shared/interfaces/http";

// Use Cases
import { CreateUser } from "@/modules/users/use-cases/create-user";

// Repositories
import { FakeUserRepository } from "../../../../../../tests/repositories/fake-user-repository";

export class UserController {
  public async create(req: IRequest, res: IResponse): Promise<IResponse> {
    const { _id, name, email, password } = req.body;

    const createUser = new CreateUser(new FakeUserRepository());

    await createUser.execute({
      _id,
      name,
      email,
      password,
    });

    return res.status(201).send();
  }
}
