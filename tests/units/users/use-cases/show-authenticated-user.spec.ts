// Packages
import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";

// Use cases
import { ShowAuthenticatedUser } from "@/modules/users/use-cases/show-authenticated-user";

// Fakes
import { FakeUserRepository } from "../../../mocks/repositories/fake-user-repository";

// Factories
import { createUserFactory } from "../../../factories";

describe("[UseCase] - Show Authenticated User", () => {
  let fakeUserRepository: FakeUserRepository;

  let showAuthenticatedUser: ShowAuthenticatedUser;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showAuthenticatedUser = new ShowAuthenticatedUser(fakeUserRepository);
  });

  it("should be able to see the logged user", async () => {
    const createdUser = await fakeUserRepository.create(createUserFactory());

    const result = await showAuthenticatedUser.execute({
      id_user: createdUser.id_user,
      email: createdUser.email,
      name: createdUser.name,
      username: createdUser.username,
    });

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toStrictEqual(createdUser);
  });

  it("should not be able to see logged user if this user does not exists", async () => {
    const result = await showAuthenticatedUser.execute({
      id_user: "non-existent-id_user",
      email: "non-existent-email",
      name: "non-existent-name",
      username: "non-existent-username",
    });

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).toHaveProperty("statusCode", 404);
  });
});
