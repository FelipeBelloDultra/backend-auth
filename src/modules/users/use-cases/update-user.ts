// Packages
import { injectable, inject } from "tsyringe";

// Interfaces
import {
  IUserRepository,
  ISelectUserToUpdate,
} from "../repositories/user-repository";

// Entities
import { IUserEntity } from "../entities/user-entity";

// Errors
import { Either, left, right } from "@/shared/errors/either";
import { UserNotFound } from "../errors/user-not-found";

interface IUpdateUserRequest {
  name: string;
  email: string;
  username: string;
  password: string;
}

type Response = Either<UserNotFound, IUserEntity>;

@injectable()
export class UpdateUser {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(
    where: ISelectUserToUpdate,
    data: IUpdateUserRequest
  ): Promise<Response> {
    const findedUserById = await this.userRepository.findById(where.id_user);

    if (
      !findedUserById ||
      findedUserById.id_user !== where.id_user ||
      findedUserById.email !== where.email
    ) {
      return left(new UserNotFound());
    }

    const updatedUser = await this.userRepository.update(
      { id_user: where.id_user, email: where.email },
      data
    );

    return right(updatedUser);
  }
}
