// Packages
import supertest from "supertest";
import { describe, expect, it } from "vitest";

// Http
import { app } from "@/shared/infra/http/app";

// Factories
import { fakeUser } from "../../factories";

const BASE_URL = "/api/user";

describe("[POST] - Create user", () => {
  it("[/user] - should be able to create a new user", async () => {
    const createFirstUser = fakeUser.createUserFactory();

    const response = await supertest(app).post(BASE_URL).send(createFirstUser);

    expect(response.status).toBe(201);
    expect(response.text).toBeFalsy();
    expect(response.body).toEqual({});
  });

  it("[/user] - should not be able to create a new user with same email", async () => {
    const createFirstUser = fakeUser.createUserFactory();
    const createSecondUser = fakeUser.createUserFactory();

    await supertest(app).post(BASE_URL).send(createFirstUser);

    const response = await supertest(app)
      .post(BASE_URL)
      .send({
        ...createSecondUser,
        email: createFirstUser.email,
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error.errors).toHaveProperty("email");
  });

  it("[/user] - should not be able to create a new user with invalid fields", async () => {
    const { status, body } = await supertest(app).post(BASE_URL).send({
      name: "",
      email: fakeUser.createEmailFactory(),
      password: "",
    });

    expect(status).toBe(422);
    expect(body).toHaveProperty("error");
    expect(body.error.errors).toHaveProperty("name");
    expect(body.error.errors).toHaveProperty("password");
    expect(body.error.errors).not.toHaveProperty("email");
  });
});
