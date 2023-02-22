// Packages
import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";

// Use cases
import { CreateUser } from "@/modules/users/use-cases/create-user";

// Errors
import { UsedEmail } from "@/modules/users/errors/used-email";

// Fakes
import { FakeUserRepository } from "../../../mocks/repositories/fake-user-repository";
import { FakeHashProvider } from "../../../mocks/providers/fake-hash-provider";

// Factories
import { createUserFactory } from "../../../factories";

describe("[UseCase] - Create User", () => {
  let fakeUserRepository: FakeUserRepository;
  let fakeHashProvider: FakeHashProvider;

  let createUser: CreateUser;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUser(fakeUserRepository, fakeHashProvider);
  });

  it("should be able to create a new user", async () => {
    const USER_1 = createUserFactory();

    const result = await createUser.execute(USER_1);

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toHaveProperty("id_user");
    expect(result.value).toHaveProperty("email");
  });

  it("should not be able to create a new user if the email already exists", async () => {
    const USER_1 = createUserFactory();
    const USER_2 = createUserFactory();

    await fakeUserRepository.create(USER_1);

    const result = await createUser.execute({
      ...USER_2,
      email: USER_1.email,
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toBeInstanceOf(UsedEmail);
  });
});
