// Packages
import "reflect-metadata";
import { beforeAll, beforeEach, describe, expect, it } from "vitest";

// Use cases
import { CreateUser } from "@/modules/users/use-cases/create-user";
import { CreateSession } from "@/modules/users/use-cases/create-session";

// Fakes
import { FakeUserRepository } from "../../../mocks/repositories/fake-user-repository";
import { FakeHashProvider } from "../../../mocks/providers/fake-hash-provider";

// Factories
import { createUserFactory } from "../../../factories";

describe("[UseCase] - Create Session", () => {
  let createUser: CreateUser;
  let createSession: CreateSession;

  let fakeUserRepository: FakeUserRepository;
  let fakeHashProvider: FakeHashProvider;

  const createdUser = createUserFactory();

  beforeEach(() => {
    createSession = new CreateSession();
  });

  beforeAll(async () => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUser(fakeUserRepository, fakeHashProvider);

    await createUser.execute(createdUser);
  });

  it("should not be able to create a new session", async () => {
    await expect(
      createSession.execute({
        email: createdUser.email,
        password: createdUser.password,
      })
    ).resolves.toBe("fail");
  });
});
