// Interfaces
import { IUserRepository } from "@/modules/users/repositories/user-repository";

// Entities
import { IUserEntity } from "@/modules/users/entities/user-entity";

// DTO's
import { ICreateUserDTO } from "@/modules/users/dtos/create-user-dto";

export class FakeUserRepository implements IUserRepository {
  private users: IUserEntity[] = [];

  public async create(data: ICreateUserDTO): Promise<IUserEntity> {
    const users = data;

    this.users = [...this.users, users];

    return users;
  }
}
