// Packages
import { injectable, inject } from "tsyringe";

// Interfaces
import { IUserRepository } from "../repositories/user-repository";

// Entities
import { IUserEntity } from "../entities/user-entity";

// Errors
import { Either, left, right } from "@/shared/errors/either";

interface ICreateUserRequest {
  name: string;
  email: string;
  password: string;
}

type Response = Either<Error, IUserEntity>;

@injectable()
export class CreateUser {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  public async execute(data: ICreateUserRequest): Promise<Response> {
    const findedUserByEmail = await this.userRepository.findByEmail(data.email);

    if (findedUserByEmail) {
      return left(new Error("Email already exists"));
    }

    const createdUser = await this.userRepository.create(data);

    return right(createdUser);
  }
}
