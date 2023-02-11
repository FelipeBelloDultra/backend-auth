import { describe, expect, it } from "vitest";

import { CreateUser } from "@/modules/users/use-cases/create-user";

describe("CreateUser", () => {
  it("should be able to create user", async () => {
    await expect(CreateUser.execute()).resolves.toBe(true);
  });
});
