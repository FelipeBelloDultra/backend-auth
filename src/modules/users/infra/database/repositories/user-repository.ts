// Database
import { prisma } from "@/shared/infra/database";

// Entities
import { IUserEntity } from "@/modules/users/entities/user-entity";

// Interfaces
import {
  IUserRepository,
  ISelectUserToUpdate,
} from "@/modules/users/repositories/user-repository";

// DTO's
import { ICreateUserDTO } from "@/modules/users/dtos/create-user-dto";
import { IUpdateUserDTO } from "@/modules/users/dtos/update-user-dto";

export class UserRepository implements IUserRepository {
  public async create(data: ICreateUserDTO): Promise<IUserEntity> {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }

  public async findByEmail(email: string): Promise<IUserEntity | undefined> {
    const findedUserByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return findedUserByEmail || undefined;
  }

  public async findById(id: string): Promise<IUserEntity | undefined> {
    const findedUserById = await prisma.user.findUnique({
      where: {
        id_user: id,
      },
    });

    return findedUserById || undefined;
  }

  public async findByUsername(
    username: string
  ): Promise<IUserEntity | undefined> {
    const findedUserByUsername = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    return findedUserByUsername || undefined;
  }

  public async update(
    where: ISelectUserToUpdate,
    data: IUpdateUserDTO
  ): Promise<IUserEntity> {
    const updatedUser = await prisma.user.update({
      where: {
        id_user: where.id_user,
      },
      data,
    });

    return updatedUser;
  }
}
