// Interfaces
import { IHashProvider } from "@/shared/container/providers/hash-provider";

export class FakeHashProvider implements IHashProvider {
  public async encodePassword(password: string): Promise<string> {
    const newPassword = `${password}-|>`;

    return newPassword;
  }

  public async compareHash(
    hashedPassword: string,
    password: string
  ): Promise<boolean> {
    const savedPassword = hashedPassword.split("-|>");

    return savedPassword[0] === password;
  }
}
