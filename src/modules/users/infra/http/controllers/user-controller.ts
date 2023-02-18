// Interfaces
import { IRequest, IResponse } from "@/shared/interfaces/http";

// Use Cases
import { CreateUser } from "@/modules/users/use-cases/create-user";

// Repositories
import { FakeUserRepository } from "../../../../../../tests/repositories/fake-user-repository";

const fakeUserRepository = new FakeUserRepository();

export class UserController {
  public async create(req: IRequest, res: IResponse): Promise<IResponse> {
    const { _id, name, email, password } = req.body;

    const createUser = new CreateUser(fakeUserRepository);

    const result = await createUser.execute({
      _id,
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
