// Database
import { prisma } from "@/shared/infra/database";

// Entities
import { IUserEntity } from "@/modules/users/entities/user-entity";

// Interfaces
import { IUserRepository } from "@/modules/users/repositories/user-repository";

// DTO's
import { ICreateUserDTO } from "@/modules/users/dtos/create-user-dto";

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
}
