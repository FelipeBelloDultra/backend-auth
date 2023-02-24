// Packages
import { randomUUID } from "node:crypto";

// Interfaces
import { IUserRepository } from "@/modules/users/repositories/user-repository";

// Entities
import { IUserEntity } from "@/modules/users/entities/user-entity";

// DTO's
import { ICreateUserDTO } from "@/modules/users/dtos/create-user-dto";

export class FakeUserRepository implements IUserRepository {
  private users: IUserEntity[] = [];

  public async create(data: ICreateUserDTO): Promise<IUserEntity> {
    const newUser: IUserEntity = {
      ...data,
      username: null,
      id_user: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.users.push(newUser);

    return newUser;
  }

  public async findByEmail(email: string): Promise<IUserEntity | undefined> {
    const findedUserByEmail = this.users.find((user) => user.email === email);

    return findedUserByEmail;
  }

  public async findById(id: string): Promise<IUserEntity | undefined> {
    const findedUserById = this.users.find((user) => user.id_user === id);

    return findedUserById;
  }

  public async findByUsername(
    username: string
  ): Promise<IUserEntity | undefined> {
    const findedUserByUsername = this.users.find(
      (user) => user.username === username
    );

    return findedUserByUsername;
  }
}
