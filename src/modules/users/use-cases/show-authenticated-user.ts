// Packages
import { injectable, inject } from "tsyringe";

// Interfaces
import { IUserRepository } from "../repositories/user-repository";

// Entities
import { IUserEntity } from "../entities/user-entity";

// Errors
import { Either, left, right } from "@/shared/errors/either";
import { UserNotFound } from "../errors/user-not-found";

interface IShowAuthenticatedUserRequest {
  id_user: string;
  name: string;
  email: string;
  username: string | null;
}

type Response = Either<UserNotFound, IUserEntity>;

@injectable()
export class ShowAuthenticatedUser {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(data: IShowAuthenticatedUserRequest): Promise<Response> {
    const findedUserById = await this.userRepository.findById(data.id_user);

    if (
      !findedUserById ||
      findedUserById.name !== data.name ||
      findedUserById.email !== data.email ||
      findedUserById.username !== data.username
    ) {
      return left(new UserNotFound());
    }

    return right(findedUserById);
  }
}
