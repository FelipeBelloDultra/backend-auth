// Packages
import supertest from "supertest";
import { describe, expect, it, afterAll, beforeAll } from "vitest";

// Http
import { app } from "@/shared/infra/http/app";

// Database
import { prisma } from "@/shared/infra/database";

// Factories
import {
  createUserFactory,
  createEmailFactory,
  createPasswordFactory,
} from "../../factories";

const BASE_URL = "/api/session";

describe("[POST] - Create session", () => {
  const createdUser = createUserFactory();

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
      email: createEmailFactory(),
    });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("error");
  });

  it("[/session] - should not be able to create an session with wrong password", async () => {
    const response = await supertest(app).post(BASE_URL).send({
      email: createdUser.email,
      password: createPasswordFactory(),
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
});

afterAll(async () => {
  await prisma.user.deleteMany();
});
