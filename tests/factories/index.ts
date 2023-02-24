// Packages
import { faker } from "@faker-js/faker";

// Entities
import { ICreateUserDTO } from "@/modules/users/dtos/create-user-dto";

class FakeUser {
  public createEmailFactory(): string {
    return faker.internet.email();
  }

  public createPasswordFactory(): string {
    return faker.internet.password();
  }

  public createFullNameFactory(): string {
    return faker.name.fullName();
  }

  public createUserFactory(): ICreateUserDTO {
    return {
      name: this.createFullNameFactory(),
      email: this.createEmailFactory(),
      password: this.createPasswordFactory(),
    };
  }

  public createUserNameFactory(): string {
    return this.createFullNameFactory().split(" ")[0].toLowerCase();
  }
}

export const fakeUser = new FakeUser();
