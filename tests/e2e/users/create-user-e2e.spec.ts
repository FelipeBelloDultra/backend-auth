// Packages
import supertest from "supertest";
import { describe, expect, it, afterAll } from "vitest";

// Http
import { app } from "@/shared/infra/http/app";

// Database
import { prisma } from "@/shared/infra/database";

// Factories
import { createUserFactory } from "../../factories";

describe("[POST] - Create user", () => {
  it("[/user] - should be able to create a new user", async () => {
    const USER = createUserFactory();

    const response = await supertest(app)
      .post("/api/user")
      .send({
        ...USER,
      });

    expect(response.status).toBe(201);
    expect(response.text).toBeFalsy();
    expect(response.body).toEqual({});
  });

  it("[/user] - should not be able to create a new user with same email", async () => {
    const USER_1 = createUserFactory();
    const USER_2 = createUserFactory();

    await supertest(app)
      .post("/api/user")
      .send({
        ...USER_1,
      });

    const response = await supertest(app)
      .post("/api/user")
      .send({
        ...USER_2,
        email: USER_1.email,
      });

    expect(response.status).toBe(422);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error.errors).toHaveProperty("email");
  });
});

afterAll(async () => {
  await prisma.user.deleteMany();
});
