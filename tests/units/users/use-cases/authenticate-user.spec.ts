// Packages
import "reflect-metadata";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";

// Use cases
import { AuthenticateUser } from "@/modules/users/use-cases/authenticate-user";

// Fakes
import { FakeUserRepository } from "../../../mocks/repositories/fake-user-repository";
import { FakeHashProvider } from "../../../mocks/providers/fake-hash-provider";

// Factories
import {
  createUserFactory,
  createEmailFactory,
  createPasswordFactory,
} from "../../../factories";

describe("[UseCase] - Authenticated User", () => {
  const createdUser = createUserFactory();

  const fakeUserRepository = new FakeUserRepository();
  const fakeHashProvider = new FakeHashProvider();

  let authenticateUser: AuthenticateUser;

  beforeEach(() => {
    authenticateUser = new AuthenticateUser(
      fakeUserRepository,
      fakeHashProvider
    );
  });

  beforeAll(async () => {
    await fakeUserRepository.create(createdUser);
  });

  it("should be able to create a new session", async () => {
    const result = await authenticateUser.execute({
      email: createdUser.email,
      password: createdUser.password,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toBeTypeOf("string");
  });

  it("should not be to create a new session if wrong email", async () => {
    const result = await authenticateUser.execute({
      email: createEmailFactory(),
      password: createdUser.password,
    });

    expect(result.isLeft()).toBeTruthy();
  });

  it("should not be to create a new session if wrong password", async () => {
    const result = await authenticateUser.execute({
      email: createdUser.password,
      password: createPasswordFactory(),
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
