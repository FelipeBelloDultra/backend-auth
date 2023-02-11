// Packages
import { faker } from "@faker-js/faker";

// Entities
import { IUserEntity } from "@/modules/users/entities/user-entity";

export function createUserFactorie(): IUserEntity {
  return {
    _id: faker.datatype.uuid(),
    name: faker.name.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
