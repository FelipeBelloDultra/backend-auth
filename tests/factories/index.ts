// Packages
import { faker } from "@faker-js/faker";

// Entities
import { ICreateUserDTO } from "@/modules/users/dtos/create-user-dto";

export function createEmailFactory(): string {
  return faker.internet.email();
}

export function createPasswordFactory(): string {
  return faker.internet.password();
}

export function createUserFactory(): ICreateUserDTO {
  return {
    name: faker.name.fullName(),
    email: createEmailFactory(),
    password: createPasswordFactory(),
  };
}
