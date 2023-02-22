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
import {
  createUserFactory,
  createEmailFactory,
  createPasswordFactory,
} from "../../../factories";

describe("[UseCase] - Create Session", () => {
  const createdUser = createUserFactory();

  const fakeUserRepository = new FakeUserRepository();
  const fakeHashProvider = new FakeHashProvider();

  const createUser = new CreateUser(fakeUserRepository, fakeHashProvider);

  let createSession: CreateSession;

  beforeEach(() => {
    createSession = new CreateSession(fakeUserRepository, fakeHashProvider);
  });

  beforeAll(async () => {
    await createUser.execute(createdUser);
  });

  it("should be able to create a new session", async () => {
    const result = await createSession.execute({
      email: createdUser.email,
      password: createdUser.password,
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toBeTypeOf("string");
  });

  it("should not be to create a new session if wrong email", async () => {
    const result = await createSession.execute({
      email: createEmailFactory(),
      password: createdUser.password,
    });

    expect(result.isLeft()).toBeTruthy();
  });

  it("should not be to create a new session if wrong password", async () => {
    const result = await createSession.execute({
      email: createdUser.password,
      password: createPasswordFactory(),
    });

    expect(result.isLeft()).toBeTruthy();
  });
});
