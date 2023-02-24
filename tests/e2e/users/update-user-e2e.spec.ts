// Packages
import supertest, { Response } from "supertest";
import { describe, expect, it, beforeAll } from "vitest";

// Http
import { app } from "@/shared/infra/http/app";

// Factories
import { fakeUser } from "../../factories";

const BASE_URL = "/api/user";

describe("[PUT] - Update user", () => {
  const createdUser = fakeUser.createUserFactory();

  let authenticatedUser: Response;

  beforeAll(async () => {
    await supertest(app).post("/api/user").send(createdUser);

    authenticatedUser = await supertest(app)
      .post("/api/session")
      .send({ email: createdUser.email, password: createdUser.password });
  });

  it("[/user] - should be able to update user data", async () => {
    const newEmail = fakeUser.createEmailFactory();
    const newPassword = fakeUser.createPasswordFactory();

    const { body } = authenticatedUser;

    const response = await supertest(app)
      .put(BASE_URL)
      .send({
        name: createdUser.name,
        email: newEmail,
        username: fakeUser.createUserNameFactory(),
        password: newPassword,
      })
      .set("Authorization", `Bearer ${body.data.token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("email");
    expect(response.body.data.email).toBe(newEmail);
    expect(response.body.data.name).toBe(createdUser.name);
  });
});
