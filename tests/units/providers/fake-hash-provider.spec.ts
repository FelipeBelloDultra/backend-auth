// Packages
import { describe, expect, it } from "vitest";

// Fakes
import { FakeHashProvider } from "../../mocks/providers/fake-hash-provider";

const fakeHashProvider = new FakeHashProvider();

describe("[Provider] - FakeHashProvider", () => {
  it("should be able to create a password hash", async () => {
    const PASSWORD = "example";

    const hashedPassword = await fakeHashProvider.encodePassword(PASSWORD);

    expect(hashedPassword).not.toBe(PASSWORD);
    expect(hashedPassword.endsWith("-|>")).toBeTruthy();
    expect(hashedPassword.startsWith(PASSWORD)).toBeTruthy();
  });

  it("should be able to compare password with hashed password", async () => {
    const PASSWORD = "example";

    const hashedPassword = await fakeHashProvider.encodePassword(PASSWORD);

    const passwordIsEqual = await fakeHashProvider.compareHash(
      hashedPassword,
      PASSWORD
    );

    expect(passwordIsEqual).toBeTruthy();
  });
});
