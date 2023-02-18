// Interfaces
import { IUserEntity } from "../entities/user-entity";

// DTO's
import { ICreateUserDTO } from "../dtos/create-user-dto";

export interface IUserRepository {
  create: (data: ICreateUserDTO) => Promise<IUserEntity>;
  findByEmail: (email: string) => Promise<IUserEntity | undefined>;
}
