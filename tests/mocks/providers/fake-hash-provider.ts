// Interfaces
import { IHashProvider } from "@/shared/providers/hash-provider";

export class FakeHashProvider implements IHashProvider {
  public async encodePassword(password: string): Promise<string> {
    const newPassword = `${password}-|>`;

    return newPassword;
  }

  public async compareHash(
    hashedPassword: string,
    password?: string
  ): Promise<boolean> {
    if (!password) {
      return false;
    }

    const savedPassword = hashedPassword.split("-|>");

    return savedPassword[0] === password;
  }
}
