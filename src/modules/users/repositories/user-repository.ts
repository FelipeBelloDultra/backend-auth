// Interfaces
import { IUserEntity } from "../entities/user-entity";

// DTO's
import { ICreateUserDTO } from "../dtos/create-user-dto";
import { IUpdateUserDTO } from "../dtos/update-user-dto";

export interface ISelectUserToUpdate {
  id_user: string;
  email: string;
}

export interface IUserRepository {
  create: (data: ICreateUserDTO) => Promise<IUserEntity>;
  findByEmail: (email: string) => Promise<IUserEntity | undefined>;
  findById: (id: string) => Promise<IUserEntity | undefined>;
  findByUsername: (username: string) => Promise<IUserEntity | undefined>;
  update: (
    where: ISelectUserToUpdate,
    data: IUpdateUserDTO
  ) => Promise<IUserEntity>;
}
