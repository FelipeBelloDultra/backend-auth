// Interfaces
import { IUserRepository } from "../repositories/user-repository";

// Entities
import { IUserEntity } from "../entities/user-entity";

interface ICreateUserRequest {
  _id: string;
  name: string;
  email: string;
  password: string;
}

export class CreateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  public async execute(data: ICreateUserRequest): Promise<IUserEntity> {
    const createdUser = await this.userRepository.create(data);

    return createdUser;
  }
}
