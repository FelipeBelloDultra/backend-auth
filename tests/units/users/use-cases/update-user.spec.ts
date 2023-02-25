// Packages
import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";

// Use cases
import { UpdateUser } from "@/modules/users/use-cases/update-user";

// Errors
import { UsedEmail } from "@/modules/users/errors/used-email";
import { UsedUsername } from "@/modules/users/errors/used-username";

// Fakes
import { FakeUserRepository } from "../../../mocks/repositories/fake-user-repository";

// Factories
import { fakeUser } from "../../../factories";

describe("[UseCase] - Update User", () => {
  let fakeUserRepository: FakeUserRepository;

  let updateUser: UpdateUser;

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    updateUser = new UpdateUser(fakeUserRepository);
  });

  it("should be able to update an existing user", async () => {
    const createdUser = await fakeUserRepository.create(
      fakeUser.createUserFactory()
    );
    const newEmail = fakeUser.createEmailFactory();
    const newUsername = fakeUser.createUserNameFactory();

    const result = await updateUser.execute(
      {
        email: createdUser.email,
        id_user: createdUser.id_user,
      },
      {
        name: createdUser.name,
        email: newEmail,
        password: createdUser.password,
        username: newUsername,
      }
    );

    expect(result.isRight()).toBeTruthy();
    expect(result.value).toHaveProperty("id_user");
    expect(result.value).toHaveProperty("name", createdUser.name);
    expect(result.value).toHaveProperty("email", newEmail);
    expect(result.value).toHaveProperty("username", newUsername);
  });

  it("should not be able to update an user if its does not exists", async () => {
    const updatedUser = {
      name: fakeUser.createFullNameFactory(),
      email: fakeUser.createEmailFactory(),
      password: fakeUser.createPasswordFactory(),
      username: fakeUser.createUserNameFactory(),
    };

    const result = await updateUser.execute(
      {
        email: "non-existent-email",
        id_user: "non-existent-id_user",
      },
      {
        name: updatedUser.name,
        email: updatedUser.email,
        password: updatedUser.password,
        username: updatedUser.username,
      }
    );

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).not.toHaveProperty("id_user");
  });

  it("should not be able to update user if the email has already been registered", async () => {
    const createdFirstUser = await fakeUserRepository.create(
      fakeUser.createUserFactory()
    );
    const newFirstUserFullName = fakeUser.createFullNameFactory();
    const newFirstUserName = fakeUser.createUserNameFactory();

    const createSecondUser = await fakeUserRepository.create(
      fakeUser.createUserFactory()
    );

    const result = await updateUser.execute(
      {
        email: createdFirstUser.email,
        id_user: createdFirstUser.id_user,
      },
      {
        email: createSecondUser.email,
        name: newFirstUserFullName,
        password: createdFirstUser.password,
        username: newFirstUserName,
      }
    );

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).not.toHaveProperty("id_user");
    expect(result.value).toBeInstanceOf(UsedEmail);
  });

  it("should not be able to update user if the username has already been registered", async () => {
    const createdFirstUser = await fakeUserRepository.create(
      fakeUser.createUserFactory()
    );
    const newFirstUserName = fakeUser.createUserNameFactory();
    await updateUser.execute(
      {
        email: createdFirstUser.email,
        id_user: createdFirstUser.id_user,
      },
      {
        email: createdFirstUser.email,
        name: createdFirstUser.email,
        password: createdFirstUser.password,
        username: newFirstUserName,
      }
    );

    const createSecondUser = await fakeUserRepository.create(
      fakeUser.createUserFactory()
    );
    const result = await updateUser.execute(
      {
        email: createSecondUser.email,
        id_user: createSecondUser.id_user,
      },
      {
        email: createSecondUser.email,
        name: createSecondUser.email,
        password: createSecondUser.password,
        username: newFirstUserName,
      }
    );

    expect(result.isLeft()).toBeTruthy();
    expect(result.value).not.toHaveProperty("id_user");
    expect(result.value).toBeInstanceOf(UsedUsername);
  });
});
