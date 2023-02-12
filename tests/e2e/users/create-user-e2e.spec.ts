// Packages
import supertest from "supertest";
import { describe, expect, it } from "vitest";

// Http
import { app } from "@/shared/infra/http/app";

// Utils
import { createUserFactorie } from "../../utils";

describe("[POST] - Create user", () => {
  it("[/user] - should be able to create a new user", async () => {
    const USER = createUserFactorie();

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
    const USER_1 = createUserFactorie();
    const USER_2 = createUserFactorie();

    supertest(app)
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
  });
});
