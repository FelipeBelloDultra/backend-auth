// Packages
import supertest from "supertest";
import { describe, expect, it, beforeAll } from "vitest";

// Http
import { app } from "@/shared/infra/http/app";

// Factories
import { fakeUser } from "../../factories";

const BASE_URL = "/api/session";

describe("[POST] - Create session", () => {
  const createdUser = fakeUser.createUserFactory();

  beforeAll(async () => {
    await supertest(app).post("/api/user").send(createdUser);
  });

  it("[/session] - should be able to create an session", async () => {
    const response = await supertest(app).post(BASE_URL).send({
      email: createdUser.email,
      password: createdUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("token");
  });

  it("[/session] - should not be able to create an session with wrong email", async () => {
    const response = await supertest(app).post(BASE_URL).send({
      password: createdUser.password,
      email: fakeUser.createEmailFactory(),
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });

  it("[/session] - should not be able to create an session with wrong password", async () => {
    const response = await supertest(app).post(BASE_URL).send({
      email: createdUser.email,
      password: fakeUser.createPasswordFactory(),
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });

  it("[/session] - should not be able to create an session with invalid fields", async () => {
    const { status, body } = await supertest(app).post(BASE_URL).send({
      email: "",
      password: "",
    });

    expect(status).toBe(422);
    expect(body).toHaveProperty("error");
    expect(body.error.errors).toHaveProperty("email");
    expect(body.error.errors).toHaveProperty("password");
  });

  it("[/session/me] - should be able to show logged user", async () => {
    const { body } = await supertest(app).post(BASE_URL).send({
      email: createdUser.email,
      password: createdUser.password,
    });

    const { token } = body.data;

    const response = await supertest(app)
      .post(`${BASE_URL}/me`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("id_user");
  });

  it("[/session/me] - should not be able to show logged user if the bearer token is empty", async () => {
    const response = await supertest(app).post(`${BASE_URL}/me`);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });

  it("[/session/me] - should not be able to show logged user if the bearer token is wrong", async () => {
    const response = await supertest(app)
      .post(`${BASE_URL}/me`)
      .set("Authorization", "Bearer WRONG-BEARER-TOKEN");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });
});
