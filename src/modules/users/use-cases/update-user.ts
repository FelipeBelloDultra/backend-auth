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
import { UsedEmail } from "../errors/used-email";
import { UsedUsername } from "../errors/used-username";

interface IUpdateUserRequest {
  name: string;
  email: string;
  username: string;
  password: string;
}

type Response = Either<UserNotFound | UsedEmail | UsedUsername, IUserEntity>;

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

    if (!findedUserById || findedUserById.email !== where.email) {
      return left(new UserNotFound());
    }

    const findedUserByEmail = await this.userRepository.findByEmail(data.email);

    if (findedUserByEmail && findedUserByEmail.id_user !== where.id_user) {
      return left(new UsedEmail());
    }

    const findedUserByUsername = await this.userRepository.findByUsername(
      data.username
    );

    if (findedUserByUsername) {
      return left(new UsedUsername());
    }

    const updatedUser = await this.userRepository.update(
      { id_user: where.id_user, email: where.email },
      data
    );

    return right(updatedUser);
  }
}
