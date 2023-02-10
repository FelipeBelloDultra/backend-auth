import supertest from "supertest";

import { app } from "@/shared/infra/http/app";

describe("Test [1]", () => {
  it("1 + 1", async () => {
    const response = await supertest(app).get("/api");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });
});
