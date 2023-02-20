// Packages
import { faker } from "@faker-js/faker";

// Entities
import { ICreateUserDTO } from "@/modules/users/dtos/create-user-dto";

export function createUserFactory(): ICreateUserDTO {
  const name = faker.name.fullName();

  return {
    name,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
